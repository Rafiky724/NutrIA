from bson import ObjectId
from fastapi import HTTPException
from app.core.database import db
from app.models.plan_model import PlanModel

class PlanController:

    @staticmethod
    async def create_plan(plan_data: dict, session=None):

        """Create a new plan for a user."""
        plan_document = PlanModel.new_plan(plan_data)
        result = await db.planes.insert_one(plan_document, session=session)
        return result.inserted_id
    
    @staticmethod
    async def update_plan_from_dieta(user_id: ObjectId, plan_update: dict, session=None):
        result = await db.planes.update_one(
            {"id_usuario": user_id},
            {"$set": plan_update},
            session=session
        )

        if result.matched_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Plan no encontrado para el usuario"
            )
        
    @staticmethod
    async def get_macros_diarios(current_user: dict) -> dict:

        user_id = ObjectId(current_user["_id"])

        plan = await db.planes.find_one(
            {"id_usuario": user_id, "activo": True},
            {
                "_id": 0,
                "calorias_diarias": 1,
                "proteinas_diarias": 1,
                "carbohidratos_diarios": 1,
                "grasas_diarias": 1
            }
        )

        if not plan:
            raise HTTPException(status_code=404, detail="Plan activo no encontrado")

        return plan