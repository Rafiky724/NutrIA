from datetime import date, datetime
from bson import ObjectId
from zoneinfo import ZoneInfo

from fastapi import HTTPException
from app.core.database import db
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

        user_id = ObjectId(current_user["_id"])
        hoy = datetime.now(ZoneInfo("America/Bogota")).date().isoformat()

        plan = await db.planes.find_one({
            "id_usuario": user_id
        })

        usuario = {

            "nombre": current_user["apodo"],
            "cantidad_gemas": current_user.get("gemas_acumuladas", 0),
            "numero_racha": 0  # Work in progress
        }

        estado = await db.estados_dia.find_one({
            
            "user_id": user_id,
            #"fecha": hoy
            "activo": True  # Work in progress

        })

        if not estado:
            
            return {
                "usuario": usuario,
                "hay_dieta_hoy": False,
                "mensaje": "Aún no has iniciado tu dieta para hoy",
                "macros_consumidos_hoy": None,
                "proxima_comida": None,
                "dia_actual": None
            }
        
        if estado["fecha"] != hoy:
            fecha = date.fromisoformat(estado["fecha"])

            return {
                "usuario": usuario,
                "hay_dieta_hoy": False,
                "mensaje": f"No existe un plan alimenticio para hoy. Tu dieta inicia el {fecha.day} de {HomeController.meses[fecha.month -1]} de {fecha.year}.",
                "macros_consumidos_hoy": None,
                "proxima_comida": None,
                "dia_actual": None
            }

        macros_consumidos = estado["macros_consumidos"]
        macros_consumidos["calorias_objetivo"] = plan["calorias_diarias"]
        macros_consumidos["proteinas_objetivo"] = plan["proteinas_diarias"]
        macros_consumidos["carbohidratos_objetivo"] = plan["carbohidratos_diarios"]
        macros_consumidos["grasas_objetivo"] = plan["grasas_diarias"]
        macros_consumidos["seguimiento_racha"] = [1,1,-1,0,2,2,2] # Work in progress

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
        
        comidas = dia["comidas"]
        index = estado["comida_actual_index"]

        if index >= len(comidas):
            proxima = None

        else:
            comida = comidas[index]
            # Aquie va la lógica para ver si hay retraso. Work in progress

            proxima = {
                "tipo_comida": comida["tipo_comida"],
                "hora_sugerida": comida["hora_sugerida"],
                "calorias": comida["calorias"],
                "proteinas": comida["proteinas"],
                "carbohidratos": comida["carbohidratos"],
                "grasas": comida["grasas"],
                "ingredientes": comida["ingredientes"],
                "precio_estimado": comida["precio_estimado"]
            }
        
        return {

            "usuario": usuario,
            "macros_consumidos_hoy": macros_consumidos,
            "proxima_comida": proxima,
            "dia_actual": DiaResponse(**dia)

        }
