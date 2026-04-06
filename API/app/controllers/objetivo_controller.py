from bson import ObjectId
from fastapi import HTTPException
from app.core.database import db
from app.models.objetivo_model import ObjetivoModel
from datetime import datetime

from app.models.plan_model import PlanModel
from app.models.user_model import UserModel
from app.schemas.objetivo import ActualizarObjetivoRequest
#from app.schemas.objetivo import ObjetivoCreate


class ObjetivoController:

    @staticmethod
    async def create_objetivo(objetivo_data: dict, session=None) -> bool:

        """Create a new objetivo for a user."""
        objetivo_document = ObjetivoModel.new_objetivo(objetivo_data)
        return await db.objetivos.insert_one(objetivo_document, session=session)
    
    @staticmethod
    async def update_objetivo_from_dieta(user_id: ObjectId, update_data: dict, session=None):

        result = await db.objetivos.update_one(
            {"id_usuario": user_id},
            {"$set": update_data},
            session=session
        )

        if result.matched_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Objetivo no encontrado para el usuario"
            )
        
    @staticmethod
    async def get_fechas_objetivo(current_user: dict) -> dict:
        
        user_id = ObjectId(current_user["_id"])

        objetivo = await db.objetivos.find_one(
            {"id_usuario": user_id},
            {"_id": 0, "fecha_inicio": 1, "fecha_estimada": 1}
        )

        if not objetivo:
            raise HTTPException(status_code=404, detail="Objetivo no encontrado")
        
        if isinstance(objetivo.get("fecha_inicio"), datetime):
            objetivo["fecha_inicio"] = objetivo["fecha_inicio"].date()

        if isinstance(objetivo.get("fecha_estimada"), datetime):
            objetivo["fecha_estimada"] = objetivo["fecha_estimada"].date()

        return objetivo
    
    @staticmethod
    async def actualizar_objetivo_usuario(current_user: dict, data: ActualizarObjetivoRequest):
        user_id = ObjectId(current_user["_id"])

        objetivo = await ObjetivoModel.get_objetivo_usuario(user_id)
        if not objetivo:
            raise HTTPException(status_code=404, detail="Objetivo no encontrado para el usuario")
        
        plan = await PlanModel.get_plan_usuario(user_id)
        if not plan:
            raise HTTPException(status_code=404, detail="Plan no encontrado para el usuario")
        
        objetivo["tipo_objetivo"] = data.tipo_objetivo
        objetivo["peso_objetivo"] = data.peso_objetivo
        plan["cantidad_comidas"] = data.cantidad_comidas
        plan["velocidad_dieta"] = data.velocidad_dieta
        current_user["nivel_actividad"] = data.nivel_actividad
        current_user["tipo_actividad"] = data.tipo_actividad

        try:
            session = await db.client.start_session()
            async with session:
                async with session.start_transaction():
                    
                    await ObjetivoModel.actualizar_objetivo_usuario(user_id, objetivo, session=session)
                    await PlanModel.actualizar_plan_usuario(user_id, plan, session=session)
                    await UserModel.actualizar_usuario(user_id, current_user, session=session)

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail="Error al actualizar el objetivo"
            )
        
        return {"message": "Objetivo actualizado exitosamente"}


