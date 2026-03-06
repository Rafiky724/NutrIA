from bson import ObjectId
from fastapi import HTTPException
from app.core.database import db
from app.models.despensa_model import DespensaModel

class DespensaController:

    @staticmethod
    async def create_despensa(despensa_data: dict, session=None) -> bool:

        """Create a new despensa for a user."""
        despensa_document = DespensaModel.new_despensa(despensa_data)
        return await db.despensas.insert_one(despensa_document, session=session)
    

    @staticmethod
    async def get_ingredientes_usuario(current_user: dict):

        user_id = ObjectId(current_user["_id"])

        despensa = await DespensaModel.get_despensa_usuario(user_id)

        if not despensa:
            raise HTTPException(
                status_code=404,
                detail="No se encontró la despensa del usuario"
            )

        ingredientes_formateados = []

        for ingrediente in despensa.get("ingredientes", []):
            ingredientes_formateados.append({
                "nombre": ingrediente[0]
            })

        #print("Ingredientes formateados:", ingredientes_formateados)

        return {
            "ingredientes": ingredientes_formateados
        }