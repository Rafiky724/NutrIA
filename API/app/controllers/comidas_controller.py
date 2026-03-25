from copy import deepcopy
from datetime import datetime, timedelta
import re
from zoneinfo import ZoneInfo
from bson import ObjectId
from fastapi import HTTPException, UploadFile
import json
from app.core.database import db
from app.core.helpers import es_mismo_dia_colombia, get_day_range_bogota
from app.core.llm import ask_llm
from app.models.estado_model import EstadoModel
from app.models.info_model import InfoModel
from app.models.logros_model import LogrosModel
from app.models.objetivo_model import ObjetivoModel
from app.models.plan_model import PlanModel
from app.models.user_model import UserModel

class ComidasController:

    dias = [
        "lunes", "martes", "miercoles",
        "jueves", "viernes", "sabado", "domingo"
    ]

    @staticmethod
    async def completar_comidaOG(current_user: dict):
        user_id = ObjectId(current_user["_id"])
        hoy = datetime.now(ZoneInfo("America/Bogota")).date()

        plan = await PlanModel.get_plan_usuario(user_id)
        if not plan:
            raise HTTPException(400, "No hay un plan activo para el usuario")

        #estado = await EstadoModel.get_estado_dia_por_fecha(plan["_id"], hoy)
        estado = await EstadoModel.get_estado_dia_por_dia(plan["_id"], ComidasController.dias[hoy.weekday()])

        if not estado:
            raise HTTPException(400, "No hay dieta activa hoy")

        # Obtener día planificado
        dia = await db.dias.find_one({
            "id_plan": ObjectId(plan["_id"]),
            "dia_semana": ComidasController.dias[datetime.now(ZoneInfo("America/Bogota")).weekday()].lower()
        })

        if not dia:
            raise HTTPException(400, "No existe plan para hoy")

        comidas = dia["comidas"]
        index = estado["comida_actual_index"]

        if index >= len(comidas):
            raise HTTPException(400, "No hay más comidas para completar")

        comida_actual = comidas[index]

        if comida_actual.get("completada"):
            raise HTTPException(400, "La comida ya fue completada")

        # Guardar copias para posible rollback
        original_estado = dict(estado)
        original_dia = dict(dia)
        original_user = await db.users.find_one({"_id": user_id})
        nuevo_estado_inserted_id = None

        try:
            # Marcar comida como completada
            comida_actual["completada"] = True
            comida_actual["verificada"] = False

            # Sumar macros a estado_dia
            nuevos_macros = {
                "calorias": estado["macros_consumidos"]["calorias"] + comida_actual.get("calorias", 0),
                "proteinas": estado["macros_consumidos"]["proteinas"] + comida_actual.get("proteinas", 0),
                "carbohidratos": estado["macros_consumidos"]["carbohidratos"] + comida_actual.get("carbohidratos", 0),
                "grasas": estado["macros_consumidos"]["grasas"] + comida_actual.get("grasas", 0),
            }

            # Actualizar index
            nuevo_index = index + 1

            await db.estados_dia.update_one(
                {"_id": estado["_id"]},
                {
                    "$set": {
                        "macros_consumidos": nuevos_macros,
                        "ultima_comida_completada": comida_actual["tipo_comida"],
                        "comida_actual_index": nuevo_index
                    }
                }
            )

            # Actualizar documento dias
            await db.dias.update_one(
                {"_id": dia["_id"]},
                {"$set": {"comidas": comidas}}
            )

            # Si era la última comida
            if nuevo_index >= len(comidas):

                todas_completadas = all(c.get("completada") for c in comidas)

                if todas_completadas:
                    nueva_racha = (original_user.get("numero_racha", 0) if original_user else 0) + 1

                    await db.users.update_one(
                        {"_id": user_id},
                        {"$set": {"dias_racha": nueva_racha}}
                    )
                else:
                    nueva_racha = original_user.get("dias_racha", 0) if original_user else 0

                # Desactivar estado actual (usar colección correcta)
                await db.estados_dia.update_one(
                    {"_id": estado["_id"]},
                    {"$set": {"activo": False}}
                )

                # Crear nuevo estado para mañana
                manana = (datetime.now(ZoneInfo("America/Bogota")).date() + timedelta(days=1)).isoformat()

                dia_siguiente = await db.dias.find_one({
                    "id_plan": ObjectId(plan["_id"]),
                    "dia_semana": ComidasController.dias[(datetime.now(ZoneInfo("America/Bogota")) + timedelta(days=1)).weekday()].lower()
                })

                if dia_siguiente:
                    nuevo_estado = {
                        "user_id": user_id,
                        "fecha": manana,
                        "dia_semana": dia_siguiente["dia_semana"],
                        "comida_actual_index": 0,
                        "ultima_comida_completada": None,
                        "macros_consumidos": {
                            "calorias": 0,
                            "proteinas": 0,
                            "carbohidratos": 0,
                            "grasas": 0
                        },
                        "inicio_dia": datetime.now(),
                        "fin_dia": None,
                        "activo": True
                    }

                    result = await db.estados_dia.insert_one(nuevo_estado)
                    nuevo_estado_inserted_id = result.inserted_id

                return {
                    "mensaje": "Día completado correctamente",
                    "comida_completada": comida_actual["tipo_comida"],
                    "nueva_comida_actual": None,
                    "racha_actual": nueva_racha
                }

            # Si NO era la última
            return {
                "mensaje": "Comida completada correctamente",
                "comida_completada": comida_actual["tipo_comida"],
                "nueva_comida_actual": comidas[nuevo_index]["tipo_comida"],
                "racha_actual": original_user.get("numero_racha", 0) if original_user else 0
            }

        except Exception as e:
            # Intentar rollback de cambios parciales
            try:
                if original_estado:
                    await db.estados_dia.replace_one({"_id": original_estado["_id"]}, original_estado)
                if original_dia:
                    await db.dias.replace_one({"_id": original_dia["_id"]}, original_dia)
                if original_user:
                    await db.users.replace_one({"_id": original_user["_id"]}, original_user)
                if nuevo_estado_inserted_id:
                    await db.estados_dia.delete_one({"_id": nuevo_estado_inserted_id})
            except Exception:
                pass

            raise HTTPException(500, f"Error al completar comida: {str(e)}")
        
    @staticmethod
    async def completar_comida(current_user: dict):
        user_id = ObjectId(current_user["_id"])
        
        hoy = datetime.now(ZoneInfo("America/Bogota")).date()
        inicio, fin = get_day_range_bogota(hoy)

        info_doc_aux = await InfoModel.get_info_day_por_fecha(user_id, inicio, fin)

        if not info_doc_aux:
            raise HTTPException(400, "No hay información del día actual para completar la comida.")
        
        if info_doc_aux["enDiaAnterior"]:
            inicio, fin = get_day_range_bogota(hoy - timedelta(days=1))

        plan = await PlanModel.get_plan_usuario(user_id)

        if not plan:
            raise HTTPException(400, "No hay un plan activo para el usuario")

        estado = await EstadoModel.get_estado_dia_por_fecha_id(plan["_id"], inicio, fin)
        #estado = await EstadoModel.get_estado_dia_por_dia(plan["_id"], ComidasController.dias[hoy.weekday()])

        if not estado:
            raise HTTPException(400, "No hay dieta activa hoy")

        comidas = estado["dieta"]["comidas"]
        index = estado["comida_actual_index"]

        if index >= len(comidas):
            raise HTTPException(400, "No hay más comidas para completar")

        comida_actual = comidas[index]

        if comida_actual.get("completada"):
            raise HTTPException(400, "La comida ya fue completada")

        # Guardar copias para posible rollback (deep copy para que no se modifique por referencia)
        original_estado = deepcopy(estado)
        original_user = await db.users.find_one({"_id": user_id})

        logros_usuario = await LogrosModel.get_logros_usuario(user_id)

        try:
            # Marcar comida como completada
            #comida_actual["completada"] = True
            #comida_actual["verificada"] = False
            comidas[index]["completada"] = True
            comidas[index]["verificada"] = False

            # Sumar macros a estado_dia
            nuevos_macros = {
                "calorias": estado["macros_consumidos"]["calorias"] + comida_actual.get("calorias", 0),
                "proteinas": estado["macros_consumidos"]["proteinas"] + comida_actual.get("proteinas", 0),
                "carbohidratos": estado["macros_consumidos"]["carbohidratos"] + comida_actual.get("carbohidratos", 0),
                "grasas": estado["macros_consumidos"]["grasas"] + comida_actual.get("grasas", 0),
            }

            # Actualizar index
            nuevo_index = index + 1

            # Si era la última comida
            if nuevo_index >= len(comidas):

                #todas_completadas = all(c.get("completada") for c in comidas)

                #if todas_completadas:
                #    nueva_racha = (original_user.get("dias_racha", 0) if original_user else 0) + 1
                #else:
                #    nueva_racha = 0

                #await db.users.update_one(
                #    {"_id": user_id},
                #    {"$set": {"dias_racha": nueva_racha, "gemas_acumuladas": original_user.get("gemas_acumuladas", 0) + 5}}
                #)

                await db.estados_dia.update_one(
                    {"_id": estado["_id"]},
                    {
                        "$set": {
                            "macros_consumidos": nuevos_macros,
                            "ultima_comida_completada": comida_actual["tipo_comida"],
                            "comida_actual_index": nuevo_index,
                            "dieta.comidas": comidas,
                            "dieta.completado": True
                        }
                    }
                )
                
                await LogrosModel.actualizar_logros_por_categoria(user_id, "completar_comidas", logros_usuario["logros"][3]["progreso_actual"]+1)

                estado["dieta"]["completado"] = True
                estado["macros_consumidos"] = nuevos_macros


                await UserModel.actualizar_gemas(user_id, original_user.get("gemas_acumuladas", 0) + 5)
                await ComidasController.verificar_dia_completado(current_user, estado, inicio, fin)

                logros_usuario = await LogrosModel.get_logros_usuario(user_id)
                await LogrosModel.actualizar_logros_por_categoria(user_id, "conseguir_gemas", logros_usuario["logros"][9]["progreso_actual"]+5)

                return {
                    "mensaje": "Día completado correctamente",
                    "comida_completada": comida_actual["tipo_comida"],
                    "nueva_comida_actual": None,
                    "racha_actual": original_user.get("dias_racha", 0),
                    "gemas_acumuladas": original_user.get("gemas_acumuladas", 0) + 5,
                }
            
            await db.estados_dia.update_one(
                {"_id": estado["_id"]},
                {
                    "$set": {
                        "macros_consumidos": nuevos_macros,
                        "ultima_comida_completada": comida_actual["tipo_comida"],
                        "comida_actual_index": nuevo_index,
                        "dieta.comidas": comidas
                    }
                }
            )
            await LogrosModel.actualizar_logros_por_categoria(user_id, "completar_comidas", logros_usuario["logros"][3]["progreso_actual"]+1)
            
            await UserModel.actualizar_gemas(user_id, original_user.get("gemas_acumuladas", 0) + 5)
            await LogrosModel.actualizar_logros_por_categoria(user_id, "conseguir_gemas", logros_usuario["logros"][9]["progreso_actual"]+5)

            # Si NO era la última
            return {
                "mensaje": "Comida completada correctamente",
                "comida_completada": comida_actual["tipo_comida"],
                "nueva_comida_actual": comidas[nuevo_index]["tipo_comida"],
                "racha_actual": original_user.get("dias_racha", 0) if original_user else 0,
                "gemas_acumuladas": original_user.get("gemas_acumuladas", 0) + 5

            }

        except Exception as e:
            # Intentar rollback de cambios parciales
            try:
                if original_estado:
                    await db.estados_dia.replace_one({"_id": original_estado["_id"]}, original_estado)
                if original_user:
                    await db.users.replace_one({"_id": original_user["_id"]}, original_user)
            except Exception:
                pass

            raise HTTPException(500, f"Error al completar comida: {str(e)}")
        
    @staticmethod
    async def cancelar_comida(current_user: dict):
        user_id = ObjectId(current_user["_id"])
        
        hoy = datetime.now(ZoneInfo("America/Bogota")).date()
        inicio, fin = get_day_range_bogota(hoy)

        info_doc_aux = await InfoModel.get_info_day_por_fecha(user_id, inicio, fin)

        if not info_doc_aux:
            raise HTTPException(400, "No hay información del día actual para completar la comida.")
        
        if info_doc_aux["enDiaAnterior"]:
            inicio, fin = get_day_range_bogota(hoy - timedelta(days=1))

        plan = await PlanModel.get_plan_usuario(user_id)

        if not plan:
            raise HTTPException(400, "No hay un plan activo para el usuario")

        estado = await EstadoModel.get_estado_dia_por_fecha_id(plan["_id"], inicio, fin)
        #estado = await EstadoModel.get_estado_dia_por_dia(plan["_id"], ComidasController.dias[hoy.weekday()])

        if not estado:
            raise HTTPException(400, "No hay dieta activa hoy")

        comidas = estado["dieta"]["comidas"]
        index = estado["comida_actual_index"]

        if index >= len(comidas):
            raise HTTPException(400, "No hay más comidas para hoy")

        comida_actual = comidas[index]

        if comida_actual.get("completada"):
            raise HTTPException(400, "La comida fue completada anteriormente")

        # Guardar copias para posible rollback (deep copy para que no se modifique por referencia)
        original_estado = deepcopy(estado)
        original_user = await db.users.find_one({"_id": user_id})

        try:
            # Marcar comida como completada
            #comida_actual["completada"] = True
            #comida_actual["verificada"] = False
            comidas[index]["completada"] = False
            comidas[index]["verificada"] = False

            # Actualizar index
            nuevo_index = index + 1

            # Si era la última comida
            if nuevo_index >= len(comidas):
                
                """
                await db.users.update_one(
                    {"_id": user_id},
                    {"$set": {"dias_racha": 0}}
                )"""

                await db.estados_dia.update_one(
                    {"_id": estado["_id"]},
                    {
                        "$set": {
                            "ultima_comida_completada": comida_actual["tipo_comida"],
                            "comida_actual_index": nuevo_index,
                            "dieta.comidas": comidas,
                            "dieta.completado": True
                        }
                    }
                )

                estado["dieta"]["completado"] = True

                await ComidasController.verificar_dia_completado(current_user, estado, inicio, fin)

                return {
                    "mensaje": "Día completado correctamente",
                    "comida_completada": comida_actual["tipo_comida"],
                    "nueva_comida_actual": None,
                    "racha_actual": original_user.get("dias_racha", 0),
                    "gemas_acumuladas": original_user.get("gemas_acumuladas", 0),
                }
            
            await db.estados_dia.update_one(
                {"_id": estado["_id"]},
                {
                    "$set": {
                        "ultima_comida_completada": comida_actual["tipo_comida"],
                        "comida_actual_index": nuevo_index,
                        "dieta.comidas": comidas
                    }
                }
            )

            # Si NO era la última
            return {
                "mensaje": "Comida cancelada correctamente",
                "comida_cancelada": comida_actual["tipo_comida"],
                "nueva_comida_actual": comidas[nuevo_index]["tipo_comida"],
                "racha_actual": current_user["dias_racha"],
                "gemas_acumuladas": original_user.get("gemas_acumuladas", 0)

            }

        except Exception as e:
            # Intentar rollback de cambios parciales
            try:
                if original_estado:
                    await db.estados_dia.replace_one({"_id": original_estado["_id"]}, original_estado)
                if original_user:
                    await db.users.replace_one({"_id": original_user["_id"]}, original_user)
            except Exception:
                pass

            raise HTTPException(500, f"Error al completar comida: {str(e)}")
        
    @staticmethod
    async def pagar_por_mantener_racha(current_user: dict):
        user_id = ObjectId(current_user["_id"])
        gemas_usuario = current_user["gemas_acumuladas"]
        
        if gemas_usuario < 100:
            raise HTTPException(400, "No tienes suficientes gemas para pagar")
        
        hoy = datetime.now(ZoneInfo("America/Bogota")).date()
        inicio, fin = get_day_range_bogota(hoy)

        info_doc_aux = await InfoModel.get_info_day_por_fecha(user_id, inicio, fin)

        if info_doc_aux.get("tomarDecisionMantenerRacha", False):
            await db.users.update_one(
                {"_id": user_id},
                {"$set": {"dias_racha": current_user["dias_racha"], "gemas_acumuladas": current_user["gemas_acumuladas"]-100}}
            )

            await InfoModel.update_info_day_por_fecha(user_id, inicio, fin, {"tomarDecisionMantenerRacha": False})
            return {"mensaje": "Racha salvada correctamente", "racha_actual": current_user["dias_racha"], "gemas_acumuladas": current_user["gemas_acumuladas"]-100}

        if not info_doc_aux:
            raise HTTPException(400, "No hay información del día actual para perder la racha.")
        
        if info_doc_aux["enDiaAnterior"]:
            inicio, fin = get_day_range_bogota(hoy - timedelta(days=1))

        plan = await PlanModel.get_plan_usuario(user_id)

        if not plan:
            raise HTTPException(400, "No hay un plan activo para el usuario")

        estado = await EstadoModel.get_estado_dia_por_fecha_id(plan["_id"], inicio, fin)
        #estado = await EstadoModel.get_estado_dia_por_dia(plan["_id"], ComidasController.dias[hoy.weekday()])

        if not estado:
            raise HTTPException(400, "No hay dieta activa hoy")

        comidas = estado["dieta"]["comidas"]
        index = estado["comida_actual_index"]

        if index < len(comidas):
            raise HTTPException(400, "Aún quedan comidas por completar")
        
        # Guardar copias para posible rollback
        original_estado = deepcopy(estado)
        original_user = await db.users.find_one({"_id": user_id})

        try:
            
            info_doc = await InfoModel.get_info_day_por_fecha(user_id, inicio, fin)
            if not info_doc:
                raise HTTPException(400, "No hay información de que el día haya terminado.")
            
            """
            await db.estados_dia.update_one(
                {"_id": estado["_id"]},
                {
                    "$set": {
                        "dieta.completado": True
                    }
                }
            )"""

            if info_doc["estado_dia"] != -1:
                raise HTTPException(400, "No hay información de que se pueda salvar la racha en este momento.")

            data = {
                "estado_dia": 2
            }

            await InfoModel.update_info_day_por_fecha(user_id, inicio, fin, data)

            await db.users.update_one(
                {"_id": user_id},
                {"$set": {"dias_racha": current_user["dias_racha"], "gemas_acumuladas": current_user["gemas_acumuladas"]-100}}
            )

            if info_doc_aux["enDiaAnterior"]:
                inicio, fin = get_day_range_bogota(hoy)
                await InfoModel.update_info_day_por_fecha(user_id, inicio, fin, {"enDiaAnterior": False})

            return {"mensaje": "Racha salvada correctamente", "racha_actual": current_user["dias_racha"], "gemas_acumuladas": current_user["gemas_acumuladas"]-100}

        except Exception as e:
            # Intentar rollback de cambios parciales
            try:
                if original_estado:
                    await db.estados_dia.replace_one({"_id": original_estado["_id"]}, original_estado)
                if original_user:
                    await db.users.replace_one({"_id": original_user["_id"]}, original_user)
            except Exception:
                pass

            raise HTTPException(500, f"Error al pagar por racha: {str(e)}")
        
    @staticmethod
    async def perder_racha(current_user: dict):
        user_id = ObjectId(current_user["_id"])
        
        hoy = datetime.now(ZoneInfo("America/Bogota")).date()
        inicio, fin = get_day_range_bogota(hoy)

        info_doc_aux = await InfoModel.get_info_day_por_fecha(user_id, inicio, fin)

        if info_doc_aux.get("tomarDecisionMantenerRacha", False):
            await db.users.update_one(
                {"_id": user_id},
                {"$set": {"dias_racha": 0}}
            )

            await LogrosModel.actualizar_logros_por_categoria(user_id, "dias_racha", 0)

            await InfoModel.update_info_day_por_fecha(user_id, inicio, fin, {"tomarDecisionMantenerRacha": False})
            return {"mensaje": "Racha perdida", "racha_actual": 0}

        if not info_doc_aux:
            raise HTTPException(400, "No hay información del día actual para perder la racha.")
        
        if info_doc_aux["enDiaAnterior"]:
            inicio, fin = get_day_range_bogota(hoy - timedelta(days=1))

        plan = await PlanModel.get_plan_usuario(user_id)

        if not plan:
            raise HTTPException(400, "No hay un plan activo para el usuario")

        estado = await EstadoModel.get_estado_dia_por_fecha_id(plan["_id"], inicio, fin)
        #estado = await EstadoModel.get_estado_dia_por_dia(plan["_id"], ComidasController.dias[hoy.weekday()])

        if not estado:
            raise HTTPException(400, "No hay dieta activa hoy")

        comidas = estado["dieta"]["comidas"]
        index = estado["comida_actual_index"]

        if index < len(comidas):
            raise HTTPException(400, "Aún quedan comidas por completar")
        
        # Guardar copias para posible rollback
        original_estado = deepcopy(estado)
        original_user = await db.users.find_one({"_id": user_id})

        try:
            
            info_doc = await InfoModel.get_info_day_por_fecha(user_id, inicio, fin)
            if not info_doc:
                raise HTTPException(400, "No hay información de que el día haya terminado.")
            
            if info_doc["estado_dia"] != -1:
                raise HTTPException(400, "No hay información de que se pueda perder la racha en este momento.")

            data = {
                "estado_dia": 3
            }

            await InfoModel.update_info_day_por_fecha(user_id, inicio, fin, data)

            await db.users.update_one(
                {"_id": user_id},
                {"$set": {"dias_racha": 0}}
            )

            await LogrosModel.actualizar_logros_por_categoria(user_id, "dias_racha", 0)

            if info_doc_aux["enDiaAnterior"]:
                inicio, fin = get_day_range_bogota(hoy)
                await InfoModel.update_info_day_por_fecha(user_id, inicio, fin, {"enDiaAnterior": False})

            return {"mensaje": "Racha perdida", "racha_actual": 0}

        except Exception as e:
            # Intentar rollback de cambios parciales
            try:
                if original_estado:
                    await db.estados_dia.replace_one({"_id": original_estado["_id"]}, original_estado)
                if original_user:
                    await db.users.replace_one({"_id": original_user["_id"]}, original_user)
            except Exception:
                pass

            raise HTTPException(500, f"Error al pagar por racha: {str(e)}")
        
    def build_prompt_verificar_comida(descripcion: str):

        return f"""
Eres un nutricionista experto.

Analiza la siguiente comida descrita por el usuario y devuelve los macronutrientes exactos.

DESCRIPCIÓN:
{descripcion}

ADVERTENCIA: SI LA DESCRIPCIÓN NO TIENE SENTIDO O ES IMPOSIBLE SACAR LOS MACROS APROXIMADAS CON ESA DESCRIPCIÓN, RESPONDE ÚNICAMENTE SOLO CON LA LETRA 'F' NADA MÁS.

RESPONDE ÚNICAMENTE EN JSON con este formato:

{{
  "calorias": float,
  "proteinas": float,
  "carbohidratos": float,
  "grasas": float,
  "ingredientes": [
    {{
      "nombre": "string" (trata de no superar las 3 palabras, entre más pocas mejor),
      "tipo": "Proteinas | Carbohidratos | Grasas | Verduras | Frutas | Bebidas | Otros",
      "cantidad": "string" (trata de ser lo más preciso posible sin tanto detalle ej: 60 gramos),
      "calorias_ingrediente": float,
      "proteinas_ingrediente": float,
      "carbohidratos_ingrediente": float,
      "grasas_ingrediente": float
    }}
  ]
}}

REGLAS:
- NO expliques nada
- NO agregues texto fuera del JSON
- Las calorías deben ser coherentes con los macros
- Estima cantidades realistas
"""    
        
    def parse_llm_json(response):
        # Si ya es dict, devolverlo directamente
        if isinstance(response, dict):
            return response

        # Si es string, limpiarlo
        if isinstance(response, str):
            response = response.strip()

            if response.startswith("```"):
                response = response.strip("```")
                response = response.replace("json", "", 1).strip()

            return json.loads(response)

        raise TypeError("El response debe ser str o dict")

    @staticmethod
    async def verificar_y_reemplazar_comida(data, current_user):

        user_id = ObjectId(current_user["_id"])

        # 1. obtener estado actual
        hoy = datetime.now(ZoneInfo("America/Bogota")).date()
        inicio, fin = get_day_range_bogota(hoy)

        info_doc_aux = await InfoModel.get_info_day_por_fecha(user_id, inicio, fin)

        if not info_doc_aux:
            raise HTTPException(400, "No hay información del día actual para completar la comida.")
        
        if info_doc_aux["enDiaAnterior"]:
            inicio, fin = get_day_range_bogota(hoy - timedelta(days=1))

        plan = await PlanModel.get_plan_usuario(user_id)

        if not plan:
            raise HTTPException(400, "No hay un plan activo para el usuario")

        estado = await EstadoModel.get_estado_dia_por_fecha_id(plan["_id"], inicio, fin)

        if not estado:
            raise HTTPException(
                status_code=400,
                detail="No hay un día activo"
            )

        index_comida = estado["comida_actual_index"]
        
        if index_comida >= len(estado["dieta"]["comidas"]):
            raise HTTPException(
                status_code=400,
                detail="No hay más comidas para completar"
            )

        comidas = estado["dieta"]["comidas"]

        # 3. llamar LLM
        prompt = ComidasController.build_prompt_verificar_comida(data.descripcion)
        
        respuesta = await ask_llm(prompt, model="gemini-2.5-flash-lite")

        if  respuesta.lower() == "f":
            raise HTTPException(
                status_code=500,
                detail=f"No pudimos identificar los macronutrientes de la comida. Intenta describirla con más detalle."
            )
        
        """
        guardar_respuesta = {
            "id_usuario": user_id,
            "cambio": respuesta
        }
        await db.nuevaComidaProvisional.insert_one(guardar_respuesta)
        
        respuesta = await db.nuevaComidaProvisional.find_one({"id_usuario": user_id})
        respuesta = respuesta["cambio"]"""

        try:
            #resultado = ComidasController.safe_parse_json(respuesta)
            #resultado = json.loads(respuesta)
            resultado = ComidasController.parse_llm_json(respuesta)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error interpretando respuesta del modelo LLM: {e}"
            )

        # 4. construir nueva comida
        comida_actual = comidas[index_comida]

        nueva_comida = {
            "tipo_comida": comida_actual["tipo_comida"],
            "hora_sugerida": comida_actual.get("hora_sugerida"),
            "hora_real": None,
            "calorias": resultado["calorias"],
            "proteinas": resultado["proteinas"],
            "carbohidratos": resultado["carbohidratos"],
            "grasas": resultado["grasas"],
            "precio_estimado": None,
            "completada": True,
            "verificada": False,
            "ingredientes": resultado["ingredientes"]
        }

        # 5. reemplazar comida
        comidas[index_comida] = nueva_comida

        macros = estado["macros_consumidos"]
        macros["calorias"] += nueva_comida["calorias"]
        macros["proteinas"] += nueva_comida["proteinas"]
        macros["carbohidratos"] += nueva_comida["carbohidratos"]
        macros["grasas"] += nueva_comida["grasas"]
        estado["comida_actual_index"] += 1
        estado["ultima_comida_completada"] = comida_actual["tipo_comida"]

        """
        # 6. recalcular totales del día
        calorias_total = sum(c["calorias"] for c in comidas)
        proteinas_total = sum(c["proteinas"] for c in comidas)
        carbs_total = sum(c["carbohidratos"] for c in comidas)
        grasas_total = sum(c["grasas"] for c in comidas)"""

        if estado["comida_actual_index"] >= len(comidas):
            estado["dieta"]["completado"] = True

            await ComidasController.verificar_dia_completado(current_user, estado, inicio, fin)

        await EstadoModel.update_estado_completo(plan["_id"], estado["dia_semana"], estado)

        return {
            "mensaje": "Comida verificada y reemplazada correctamente",
            "comida": nueva_comida,
            "totales_comida": {
                "calorias": nueva_comida["calorias"],
                "proteinas": nueva_comida["proteinas"],
                "carbohidratos": nueva_comida["carbohidratos"],
                "grasas": nueva_comida["grasas"]
            }
        }
    
    @staticmethod
    async def verificar_dia_completado(current_user: dict, estado: dict, inicio, fin):
        user_id = ObjectId(current_user["_id"])

        if estado["dieta"]["completado"]:
            
            DiaIniciar = False
            calorias_consumidas_totales = estado["macros_consumidos"]["calorias"]
            
            objetivo_doc = await ObjetivoModel.get_objetivo_usuario(user_id)
            calorias_objetivo = objetivo_doc["calorias_diarias"]

            if es_mismo_dia_colombia(objetivo_doc["fecha_inicio"]):
                DiaIniciar = True

            if ((calorias_objetivo * 0.85) <= calorias_consumidas_totales <= (calorias_objetivo * 1.15)) or DiaIniciar:
                
                data = {
                   "estado_dia": 1,
                }

                await db.users.update_one(
                    {"_id": user_id},
                    {"$set": {"dias_racha": current_user["dias_racha"]+1}}
                )

                await LogrosModel.actualizar_logros_por_categoria(user_id, "dias_racha", current_user["dias_racha"]+1)

                user = await UserModel.get_usuario_por_id(user_id)
                await UserModel.actualizar_gemas(user_id, user.get("gemas_acumuladas", 0) + 15)

                logros_usuario = await LogrosModel.get_logros_usuario(user_id)

                await LogrosModel.actualizar_logros_por_categoria(user_id, "conseguir_gemas", logros_usuario["logros"][9]["progreso_actual"]+15)

                hoy = datetime.now(ZoneInfo("America/Bogota")).date()
                inicio_aux, fin_aux = get_day_range_bogota(hoy)

                info_doc_aux = await InfoModel.get_info_day_por_fecha(user_id, inicio_aux, fin_aux)

                if not info_doc_aux:
                    raise HTTPException(400, "No hay información del día actual para perder la racha.")

                if info_doc_aux["enDiaAnterior"]:
                    inicio_aux, fin_aux = get_day_range_bogota(hoy)
                    await InfoModel.update_info_day_por_fecha(user_id, inicio_aux, fin_aux, {"enDiaAnterior": False})
                
            else:
                data = {
                   "estado_dia": -1,
                }

            info_day = await InfoModel.get_info_day_por_fecha(user_id, inicio, fin)

            if not info_day:

                await InfoModel.crear_info_day(user_id, data)
                return
                
            else:
                await InfoModel.update_info_day_por_fecha(user_id, inicio, fin, data)
                return
        else:
            raise HTTPException(500, f"El día no fue completado")
        
    @staticmethod
    async def analizar_comida_modelo(file: UploadFile, user: dict):

        # 🔥 Validación básica (importante para frontend)
        if not file.content_type.startswith("image/"):
            return {
                "match": False
            }

        # Aquí luego irá:
        # - lectura de imagen
        # - modelo
        # - LLM

        # Por ahora SIEMPRE falso (mock)
        return {
            "match": False
        }