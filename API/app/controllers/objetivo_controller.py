from bson import ObjectId
from fastapi import HTTPException
from app.core.database import db
from app.models.objetivo_model import ObjetivoModel
from datetime import datetime
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