from datetime import datetime
from zoneinfo import ZoneInfo
from bson import ObjectId
from app.core.database import db

class DespensaModel:

    @staticmethod
    def new_despensa(data: dict) -> dict:

        """Create a new despensa document."""
        
        return {

            "id_usuario": data["_id"],
            "ingredientes": data["ingredientes"],
            "creado_en": datetime.now(ZoneInfo("America/Bogota")),
            "fecha_actualizacion": None

        }
    
    @staticmethod
    async def get_despensa_usuario(user_id: ObjectId):
        return await db.despensas.find_one(
            {"id_usuario": user_id},
            {"ingredientes": 1}
        )