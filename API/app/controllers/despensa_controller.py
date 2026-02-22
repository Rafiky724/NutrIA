from app.core.database import db
from app.models.despensa_model import DespensaModel

class DespensaController:

    @staticmethod
    async def create_despensa(despensa_data: dict, session=None) -> bool:

        """Create a new despensa for a user."""
        despensa_document = DespensaModel.new_despensa(despensa_data)
        return await db.despensas.insert_one(despensa_document, session=session)