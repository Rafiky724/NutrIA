from datetime import datetime
from zoneinfo import ZoneInfo
from app.core.database import db
from bson import ObjectId

class PlanModel:

    @staticmethod
    def new_plan(data: dict) -> dict:

        """Create a new plan document."""
        
        return {

            "id_usuario": data["_id"],
            "fecha_inicio": None,
            "fecha_fin": None,
            "cantidad_comidas": data["cantidad_comidas"],
            "tipo_dieta": data["tipo_dieta"],
            "velocidad_dieta": data["velocidad_dieta"],
            "proteinas_diarias": None,
            "carbohidratos_diarios": None,
            "grasas_diarias": None,
            "calorias_diarias": None,
            "presupuesto_semanal": None,
            "creado_en": datetime.now(ZoneInfo("America/Bogota")),
            "activo": True

        }
    
    async def get_plan_by_user_id(user_id: ObjectId) -> dict:

        plan = await db.planes.find_one(
            {"id_usuario": user_id, "activo": True},
            {"_id": 0}
        )
        return plan

    @staticmethod
    async def actualizar_tipo_dieta(user_id: ObjectId, tipo_dieta, presupuesto):
        return await db.planes.update_one(
            {"id_usuario": user_id},
            {
                "$set": {
                    "tipo_dieta": tipo_dieta,
                    "presupuesto_semanal": presupuesto
                }
            }
        )
    
    @staticmethod
    async def actualizar_dia_actualizar_dieta(user_id: ObjectId, dia_actualizar):
        return await db.planes.update_one(
            {"id_usuario": user_id},
            {
                "$set": {
                    "dia_actualizar_dieta": dia_actualizar
                }
            }
        )
    
    @staticmethod
    async def get_plan_usuario(user_id: ObjectId) -> dict:
        return await db.planes.find_one(
            {"id_usuario": user_id, "activo": True}
        )
    
    @staticmethod
    async def actualizar_plan_usuario(user_id: ObjectId, data, session=None):
        kwargs = {}
        if session is not None:
            kwargs["session"] = session
        return await db.planes.update_one(
            {"id_usuario": user_id, "activo": True},
            {"$set": data},
            **kwargs
        )