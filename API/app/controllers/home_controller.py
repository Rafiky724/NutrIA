from datetime import date, datetime, timedelta
from bson import ObjectId
from zoneinfo import ZoneInfo

from fastapi import HTTPException
from app.core.database import db
from app.core.helpers import get_day_range_bogota, comparar_horas, comparar_con_hoy_bogota
from app.models.estado_model import EstadoModel
from app.models.info_model import InfoModel
from app.models.plan_model import PlanModel
from app.schemas.dias import DiaResponse

class HomeController:

    dias = [
        "lunes", "martes", "miercoles",
        "jueves", "viernes", "sabado", "domingo"
    ]

    meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ]

    @staticmethod
    async def get_home(current_user: dict):

        #Modalas
        modal_subir_racha = False
        modal_pagar_racha = False
        modal_perder_racha = False
        modal_advertencia_racha = False
        modal_dia_actualizar_dieta = False

        plan = None

        user_id = ObjectId(current_user["_id"])
        hoy = datetime.now(ZoneInfo("America/Bogota")).date()

        inicio, fin = get_day_range_bogota(hoy)

        info_doc_hoy = await InfoModel.get_info_day_por_fecha(user_id, inicio, fin)

        if not info_doc_hoy:
            
            ayer = hoy - timedelta(days=1)
            inicio_ayer, fin_ayer = get_day_range_bogota(ayer)

            info_doc_ayer = await InfoModel.get_info_day_por_fecha(user_id, inicio_ayer, fin_ayer)

            if info_doc_ayer:

                if info_doc_ayer["estado_dia"] == -1 or info_doc_ayer["estado_dia"] == 4:
                    
                    if info_doc_ayer["estado_dia"] == 4:
                        modal_advertencia_racha = True

                    try:

                        data = {
                            "estado_dia": 4,
                            "enDiaAnterior": True
                        }
                        await InfoModel.crear_info_day(user_id, data)
                    
                    except Exception as e:
                        raise HTTPException(
                            status_code=500,
                            detail=f"Error al intentar iniciar el día: {e}"
                        )
                    
                    inicio, fin = inicio_ayer, fin_ayer

                else:
                    data = {
                        "estado_dia": 4
                    }
                    await InfoModel.crear_info_day(user_id, data)

            else:
                antier = hoy - timedelta(days=2)
                inicio_antier, fin_antier = get_day_range_bogota(antier)

                info_doc_antier = await InfoModel.get_info_day_por_fecha(user_id, inicio_antier, fin_antier)

                if info_doc_antier is not None and info_doc_antier["estado_dia"] in (1, 2, 3):
                    modal_advertencia_racha = True

                    ayer = hoy - timedelta(days=1)
                    inicio_ayer, fin_ayer = get_day_range_bogota(ayer)
                    try:

                        data = {
                            "estado_dia": 4,
                            "enDiaAnterior": True
                        }

                        data2 = {
                            "estado_dia": 4
                        }

                        await InfoModel.crear_info_day_ayer(user_id, data2)
                        await InfoModel.crear_info_day(user_id, data)
                        
                    except Exception as e:
                        raise HTTPException(
                            status_code=500,
                            detail=f"Error al intentar iniciar el día: {e}"
                        )
                        
                    inicio, fin = inicio_ayer, fin_ayer

                else:
                    racha = current_user["dias_racha"]

                    if racha > 0:
                        data = {
                            "estado_dia": 4,
                            "tomarDecisionMantenerRacha": True
                        
                        }
                        modal_pagar_racha = True
                    else:
                        data = {
                            "estado_dia": 4
                        }

                    await InfoModel.crear_info_day(user_id, data)

        else:
            plan = await PlanModel.get_plan_usuario(user_id)
            dia_semana = HomeController.dias[hoy.weekday()]

            if plan.get("dia_actualizar_dieta", False) == dia_semana:

                if not info_doc_hoy["mostroModalActualizacionDieta"]:
                    try:
                        await InfoModel.update_info_day_por_fecha(user_id, inicio, fin, {"mostroModalActualizacionDieta": True})
                        modal_dia_actualizar_dieta = True
                    except Exception as e:
                        raise HTTPException(
                            status_code=500,
                            detail=f"Error al intentar mostrar actualización de dieta: {e}"
                        )

        info_doc_hoy = await InfoModel.get_info_day_por_fecha(user_id, inicio, fin) #ESTO DEBERÁ CAMBIAR DE POSICIÓN DESPUÉS

        if info_doc_hoy["enDiaAnterior"]:
            ayer = hoy - timedelta(days=1)
            inicio, fin = get_day_range_bogota(ayer)

        if info_doc_hoy.get("tomarDecisionMantenerRacha", False):
            modal_pagar_racha = True

        if plan is None:
            plan = await PlanModel.get_plan_usuario(user_id)

        if not plan:
            raise HTTPException(status_code=404, detail="Plan activo no encontrado")

        usuario = {

            "nombre": current_user["apodo"],
            "cantidad_gemas": current_user.get("gemas_acumuladas", 0),
            "numero_racha": current_user.get("dias_racha", 0)
        }

        
        estado = await EstadoModel.get_estado_dia_por_fecha(plan["_id"], inicio, fin)
        #print(estado)
        #return {200: "ok"}
        """
        try:
            array_dias = await HomeController.crear_array_dias(user_id)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error trayendo información de la semana: {e}"
            )"""
        array_dias = await HomeController.crear_array_dias(user_id)

        if not estado:

            modals = {

                "mostrar_subir_racha": modal_subir_racha,
                "mostrar_pagar_racha": modal_pagar_racha,
                "mostrar_perder_racha": modal_perder_racha,
                "mostrar_advertencia_racha": modal_advertencia_racha,
                "mostrar_actualizar_dieta": modal_dia_actualizar_dieta

            }

            fecha = plan["fecha_inicio"]

            comparacion = comparar_con_hoy_bogota(fecha)

            if comparacion == "despues":

                return {
                    "usuario": usuario,
                    "hay_dieta_hoy": False,
                    "mensaje": f"No existe un plan alimenticio para hoy. Tu dieta inicia el {fecha.day} de {HomeController.meses[fecha.month -1]} de {fecha.year}.",
                    "macros_consumidos_hoy": None,
                    "proxima_comida": None,
                    "dia_actual": None,
                    "modals": modals
                }
            
            else:

                try:

                    await EstadoModel.create_estado_model_today(user_id, plan["_id"], HomeController.dias[hoy.weekday()])

                    estado = await EstadoModel.get_estado_dia_por_fecha(plan["_id"], inicio, fin)
                
                except Exception as e:
                    raise HTTPException(
                        status_code=500,
                        detail=f"Error creando la información para el día de hoy: {e}"
                    )

        macros_consumidos = estado["macros_consumidos"]
        macros_consumidos["calorias_objetivo"] = plan["calorias_diarias"]
        macros_consumidos["proteinas_objetivo"] = plan["proteinas_diarias"]
        macros_consumidos["carbohidratos_objetivo"] = plan["carbohidratos_diarios"]
        macros_consumidos["grasas_objetivo"] = plan["grasas_diarias"]
        macros_consumidos["seguimiento_racha"] = array_dias #[1,1,-1,0,2,2,2] Work in progress
        dia = estado["dieta"]
        dia["dia_semana"] = HomeController.dias[hoy.weekday()]
        dia["created_at"] = estado["created_at"]
        """
        dia = await db.dias.find_one({
            "id_plan": ObjectId(plan["_id"]),
            "dia_semana": HomeController.dias[datetime.now(ZoneInfo("America/Bogota")).weekday()]
            #"activo": True # Hay que poner verificación de que el día esté activo. Work in progress
        })

        if not dia:

            fecha = date.fromisoformat(estado["fecha"])

            return {
                "usuario": usuario,
                "hay_dieta_hoy": False,
                "mensaje": f"No existe un plan alimenticio para hoy. Tu dieta inicia el {fecha.day} de {HomeController.meses[fecha.month -1]} de {fecha.year}.",
                "macros_consumidos_hoy": None,
                "proxima_comida": None,
                "dia_actual": None
            }
        """
        
        comidas = dia["comidas"]
        index = estado["comida_actual_index"]

        if index >= len(comidas):
            proxima = "Haz acabado tu plan alimenticio para el día de hoy. Vuelve mañana."
            modal_subir_racha, modal_pagar_racha, modal_perder_racha = await HomeController.verificar_modal_mostrar(current_user, inicio, fin)


        else:
            comida = comidas[index]

            urgencia_comida = comparar_horas(comida["hora_sugerida"])

            inicio_aux, fin_aux = get_day_range_bogota(hoy)

            info_doc_aux = await InfoModel.get_info_day_por_fecha(user_id, inicio_aux, fin_aux)

            if info_doc_aux:
                if info_doc_aux["enDiaAnterior"]:
                    urgencia_comida = {"color": "#260B01", "mensaje": "¡Tu comida está retrasada!", "estado": 2}

            proxima = {
                "tipo_comida": comida["tipo_comida"],
                "hora_sugerida": comida["hora_sugerida"],
                "calorias": comida["calorias"],
                "proteinas": comida["proteinas"],
                "carbohidratos": comida["carbohidratos"],
                "grasas": comida["grasas"],
                "ingredientes": comida["ingredientes"],
                "precio_estimado": comida["precio_estimado"],
                "estado": urgencia_comida
            }

        modals = {

            "mostrar_subir_racha": modal_subir_racha,
            "mostrar_pagar_racha": modal_pagar_racha,
            "mostrar_perder_racha": modal_perder_racha,
            "mostrar_advertencia_racha": modal_advertencia_racha,
            "mostrar_actualizar_dieta": modal_dia_actualizar_dieta

        }
        
        return {

            "usuario": usuario,
            "macros_consumidos_hoy": macros_consumidos,
            "proxima_comida": proxima,
            "dia_actual": DiaResponse(**dia),
            "modals": modals

        }

    @staticmethod
    async def verificar_modal_mostrar(current_user: dict, inicio, fin):
        user_id = ObjectId(current_user["_id"])

        modal_subir_racha = False
        modal_pagar_racha = False
        modal_perder_racha = False
        
        info_doc = await InfoModel.get_info_day_por_fecha(user_id, inicio, fin)

        if not info_doc:
            raise HTTPException(400, "No hay información de que el día haya terminado.")
        
        if info_doc["estado_dia"] == 1 and not info_doc["mostroAumentarRacha"]:
            modal_subir_racha = True

            data = {
                "mostroAumentarRacha": True
            }
            try:
                await InfoModel.update_info_day_por_fecha(user_id, inicio, fin, data)
            except Exception as e:
                raise HTTPException(
                    status_code=500,
                    detail=f"Error: {e}"
                )

        elif info_doc["estado_dia"] == -1:
            modal_pagar_racha = True

        elif info_doc["estado_dia"] == 3 and not info_doc["mostroPerderRacha"]:
            modal_perder_racha = True

            data = {
                "mostroPerderRacha": True
            }
            try:
                await InfoModel.update_info_day_por_fecha(user_id, inicio, fin, data)
            except Exception as e:
                raise HTTPException(
                    status_code=500,
                    detail=f"Error: {e}"
                )


        return modal_subir_racha, modal_pagar_racha, modal_perder_racha
    
    @staticmethod
    async def crear_array_dias(user_id):
        lista_dias = await InfoModel.get_infos_semana_actual(user_id)
        array = []

        for dia in lista_dias:
            
            if dia.get("data", False):

                if dia["data"]["estado_dia"] == 1:
                    array.append(1)
                elif dia["data"]["estado_dia"] == 2 or dia["data"]["estado_dia"] == 4:
                    array.append(0)
                elif dia["data"]["estado_dia"] == -1 or dia["data"]["estado_dia"] == 3:
                    array.append(-1)
                else:
                    array.append(2)
            else:
                array.append(2)

        if len(array) < 7:
            for _ in range(7 - len(array)):
                array.append(2)

        return array