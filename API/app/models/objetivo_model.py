from datetime import datetime, date
from zoneinfo import ZoneInfo

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