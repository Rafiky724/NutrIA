from datetime import datetime, date
from zoneinfo import ZoneInfo

from bson import ObjectId
from app.core.database import db

class ObjetivoModel:

    @staticmethod
    def new_objetivo(data: dict) -> dict:

        """Create a new objetivo document."""
        
        return {

            "id_usuario": data["_id"],
            "tipo_objetivo": data["tipo_objetivo"],
            "peso_objetivo": data["peso_objetivo"],
            "fecha_inicio": datetime.now(ZoneInfo("America/Bogota")),
            "fecha_estimada": None,
            "calorias_diarias": None,
            "creado_en": datetime.now(ZoneInfo("America/Bogota")),
            "activo": True

        }
    
    @staticmethod
    async def get_objetivo_usuario(user_id: str) -> dict:
        objetivo = await db.objetivos.find_one(
            {"id_usuario": user_id, "activo": True},
            {"_id": 0}
        )
        return objetivo
    
    @staticmethod
    async def actualizar_objetivo_usuario(user_id: ObjectId, data, session=None):
        kwargs = {}
        if session is not None:
            kwargs["session"] = session
        return await db.objetivos.update_one(
            {"id_usuario": user_id, "activo": True},
            {"$set": data},
            **kwargs
        )
    