from datetime import datetime
from zoneinfo import ZoneInfo

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