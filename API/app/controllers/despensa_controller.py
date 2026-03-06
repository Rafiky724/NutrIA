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
    
    @staticmethod
    async def update_ingredientes_usuario(current_user: dict, data):

        user_id = ObjectId(current_user["_id"])

        despensa = await DespensaModel.get_despensa_usuario(user_id)

        if not despensa:
            raise HTTPException(
                status_code=404,
                detail="No se encontró la despensa del usuario"
            )

        ingredientes_db = []

        for ingrediente in data.ingredientes:
            ingredientes_db.append([
                ingrediente['nombre']
            ])

        try:
            await DespensaModel.update_ingredientes(user_id, ingredientes_db)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error al actualizar la despensa: {str(e)}"
            )

        return {
            "mensaje": "Despensa actualizada correctamente",
            "ingredientes": data.ingredientes
        }