from copy import deepcopy
from datetime import datetime, time
from zoneinfo import ZoneInfo

from pymongo import ReturnDocument

from app.core.database import db
from app.models.dias_model import DiaModel

class EstadoModel:

    @staticmethod
    async def get_estado_dia_por_fecha(plan_id, inicio, fin):
        return await db.estados_dia.find_one({
            "plan_id": plan_id,
            "fecha": {
                "$gte": inicio,
                "$lte": fin
            },
            "activo": True
        }, {"_id": 0})
    
    @staticmethod
    async def get_estado_dia_por_fecha_id(plan_id, inicio, fin):
        return await db.estados_dia.find_one({
            "plan_id": plan_id,
            "fecha": {
                "$gte": inicio,
                "$lte": fin
            },
            "activo": True
        })
    
    @staticmethod
    async def get_estado_dia_por_dia(plan_id, dia):
        return await db.estados_dia.find_one({
            "plan_id": plan_id,
            "dia_semana": dia,
            "activo": True
        }, {"_id": 0})

    @staticmethod
    async def edit_estado_dia(plan_id, estado, dia_semana, session=None):
        """Actualiza el estado de un día en la colección estados_dia.

        Args:
            plan_id: ObjectId del plan.
            estado: Diccionario de la dieta (sin _id / sin plan_id).
            dia_semana: Nombre del día de la semana (ej. 'lunes').
            session: Sesión opcional de MongoDB.
        """

        return await db.estados_dia.update_one(
            {"plan_id": plan_id, "dia_semana": dia_semana, "activo": True},
            {"$set": {"dieta": estado}},
            session=session
        )
    
    @staticmethod
    async def edit_estado_dia_dia_mas_cercano(plan_id, estado, dia_semana, session=None, tipo_comida=None, comida_ia=None):

        hoy = datetime.now(ZoneInfo("America/Bogota"))

        # 1. Buscar el documento más cercano
        docs = await db.estados_dia.aggregate([
            {
                "$match": {
                    "plan_id": plan_id,
                    "dia_semana": dia_semana,
                    "activo": True
                }
            },
            {
                "$addFields": {
                    "diff": {
                        "$abs": {
                            "$subtract": ["$fecha", hoy]
                        }
                    }
                }
            },
            {"$sort": {"diff": 1}},
            {"$limit": 1}
        ]).to_list(1)

        if not docs:
            return None

        doc_id = docs[0]["_id"]

        doc_dieta = docs[0].get("dieta", {})

        for comida in doc_dieta.get("comidas", []):
            if comida.get("tipo_comida").lower() == tipo_comida.lower():
                comida["ingredientes"] = comida_ia["ingredientes"]
                comida["calorias"] = comida_ia["calorias"]
                comida["proteinas"] = comida_ia["proteinas"]
                comida["carbohidratos"] = comida_ia["carbohidratos"]
                comida["grasas"] = comida_ia["grasas"]
                comida["precio_estimado"] = comida_ia["precio_estimado"]
                comida["verificada"] = False
                comida["completada"] = False

        
        #print(f"Doc dieta actualizada: {doc_dieta}")

        # 2. Actualizar ese documento
        return await db.estados_dia.update_one(
            {"_id": doc_id},
            {"$set": {"dieta": doc_dieta}},
            session=session
        )
        

    """
    async def actualizar_estado_dia(user_id, estado, session=None):
        kwargs = {}
        if session is not None:
            kwargs["session"] = session
        return await db.estados_dia.update_one(
            {"id_usuario": user_id},
            {"$set": estado},
            **kwargs
        )"""
    
    """
    @staticmethod
    async def update_estado_comida(plan_id, comida, index, dia_semana, session=None):

        return await db.estados_dia.update_one(
            {
                "plan_id": plan_id,
                "dia_semana": dia_semana,
                "activo": True
            },
            {
                "$set": {
                    f"dieta.comidas.{index}": comida
                }
            },
            session=session
        )"""
    
    @staticmethod
    async def update_estado_completo(plan_id, dia_semana, data):

        data.pop("_id", None)

        return await db.estados_dia.update_one(
            {"plan_id": plan_id,
                "dia_semana": dia_semana,
                "activo": True},
            {"$set": data}
        )
    
    @staticmethod
    async def create_estado_model_today(user_id, plan_id, dia_semana):

        hoy = datetime.now(ZoneInfo("America/Bogota")).date()

        fecha = datetime.combine(
            hoy,
            time.min,
            tzinfo=ZoneInfo("America/Bogota")
        )

        dia_doc = await DiaModel.get_dia_user(plan_id, dia_semana)

        if not dia_doc:
            raise Exception(f"No existe dieta plantilla para {dia_semana}")

        comidas = deepcopy(dia_doc["comidas"])

        macros_consumidos ={

            "calorias": 0,
            "proteinas": 0,
            "carbohidratos": 0,
            "grasas": 0
        }

        doc = {

            "user_id": user_id,
            "plan_id": plan_id,
            "fecha": fecha,
            "dia_semana": dia_semana,
            "comida_actual_index": 0,
            "ultima_comida_completada": None,
            "macros_consumidos": macros_consumidos,
            "inicio_dia": None,
            "fin_dia": None,
            "activo": True,
            "dieta": {
                "calorias_totales": dia_doc["calorias_totales"],
                "proteinas_totales": dia_doc["proteinas_totales"],
                "carbohidratos_totales": dia_doc["carbohidratos_totales"],
                "grasas_totales": dia_doc["grasas_totales"],
                "completado": False,
                "comidas": comidas
            },
            "created_at": datetime.now(ZoneInfo("America/Bogota")),
            "updated_at":datetime.now(ZoneInfo("America/Bogota"))

        }

        return await db.estados_dia.insert_one(doc)
        