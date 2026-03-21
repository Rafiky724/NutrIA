from bson import ObjectId
from fastapi import HTTPException
from app.core.database import db
from app.core.llm import ask_llm
from app.models.despensa_model import DespensaModel
from app.schemas.despensa import VerificarIngredienteRequest

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

    def build_promt_verificar_ingrediente(ingrediente: str):
        return f"""
Eres verificador de ingredientes.
RESPONDE SOLO UNA letra: T o F.
T = existe (ingrediente real).
F = no existe.
Prohibido explicar o agregar texto.
Debe ser un ingrediente SOLO, nada de comidas completas ni ingredientes que no especifique (ej. "salsa" por sí sola NO ES VÁLIDO)
Entrada: {ingrediente}
    """
    
    @staticmethod
    async def verificar_nuevo_ingrediente(data: VerificarIngredienteRequest):

        ingrediente = data.ingrediente
        promt = DespensaController.build_promt_verificar_ingrediente(ingrediente)

        try:

            response_text = await ask_llm(promt, model="gemini-2.5-flash")

            if response_text.lower() == "t":
                return {
                    "esIngrediente": True
                }
            elif response_text.lower() == "f":
                return {
                    "esIngrediente": False
                }
            else:
                raise HTTPException(
                    status_code=400,
                    detail="Respuesta inválida del LLM"
                )
        
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error al verificar ingrediente: {str(e)}"
            )