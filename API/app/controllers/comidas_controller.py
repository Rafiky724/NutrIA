from copy import deepcopy
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from bson import ObjectId
from fastapi import HTTPException
from app.core.database import db
from app.core.helpers import get_day_range_bogota
from app.models.estado_model import EstadoModel
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

            # Si era la última comida
            if nuevo_index >= len(comidas):

                todas_completadas = all(c.get("completada") for c in comidas)

                if todas_completadas:
                    nueva_racha = (original_user.get("dias_racha", 0) if original_user else 0) + 1
                else:
                    nueva_racha = 0

                await db.users.update_one(
                    {"_id": user_id},
                    {"$set": {"dias_racha": nueva_racha, "gemas_acumuladas": original_user.get("gemas_acumuladas", 0) + 5}}
                )

                return {
                    "mensaje": "Día completado correctamente",
                    "comida_completada": comida_actual["tipo_comida"],
                    "nueva_comida_actual": None,
                    "racha_actual": nueva_racha,
                    "gemas_acumuladas": original_user.get("gemas_acumuladas", 0) + 5,
                }

            await UserModel.actualizar_gemas(user_id, original_user.get("gemas_acumuladas", 0) + 5)

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

            await db.estados_dia.update_one(
                {"_id": estado["_id"]},
                {
                    "$set": {
                        "ultima_comida": comida_actual["tipo_comida"],
                        "comida_actual_index": nuevo_index,
                        "dieta.comidas": comidas
                    }
                }
            )

            # Si era la última comida
            if nuevo_index >= len(comidas):

                await db.users.update_one(
                    {"_id": user_id},
                    {"$set": {"dias_racha": 0}}
                )

                return {
                    "mensaje": "Día completado correctamente",
                    "comida_completada": comida_actual["tipo_comida"],
                    "nueva_comida_actual": None,
                    "racha_actual": 0,
                    "gemas_acumuladas": original_user.get("gemas_acumuladas", 0) + 5,
                }

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
        
        if gemas_usuario < 50:
            raise HTTPException(400, "No tienes suficientes gemas para pagar")
        
        hoy = datetime.now(ZoneInfo("America/Bogota")).date()
        inicio, fin = get_day_range_bogota(hoy)

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
            await db.estados_dia.update_one(
                {"_id": estado["_id"]},
                {
                    "$set": {
                        "dieta.completado": True
                    }
                }
            )

            await db.users.update_one(
                {"_id": user_id},
                {"$set": {"dias_racha": current_user["dias_racha"]+1, "gemas_acumuladas": current_user["gemas_acumuladas"]-50}}
            )

            return {"mensaje": "Racha salvada correctamente", "racha_actual": current_user["dias_racha"]+1, "gemas_acumuladas": current_user["gemas_acumuladas"]-50}

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
            await db.estados_dia.update_one(
                {"_id": estado["_id"]},
                {
                    "$set": {
                        "dieta.completado": False
                    }
                }
            )

            await db.users.update_one(
                {"_id": user_id},
                {"$set": {"dias_racha": 0}}
            )

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