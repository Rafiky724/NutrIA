from datetime import date, datetime
from bson import ObjectId

def user_dict(user) -> dict:

    """Convert a user document from MongoDB to a dictionary suitable for UserResponse schema."""

    return {
        "user_id": str(user["_id"]),
        "apodo": user["apodo"],
        "nombre_completo": user["nombre_completo"],
        "email": user["email"],
        "genero": user["genero"],
        "fecha_nacimiento": user["fecha_nacimiento"].date(),
        "altura_cm": user["altura_cm"],
        "peso_actual": user["peso_actual"],
        "fecha_registro": user["fecha_registro"].date(),
        "gemas_acumuladas": user["gemas_acumuladas"],
        #"ultimo_login": user["ultimo_login"],
        #"ultima_actualizacion_peso": user["ultima_actualizacion_peso"],
        #"activo": user["activo"],
    }

class UserModel:

    """Model for user-related database operations."""

    @staticmethod
    def new_user(data: dict) -> dict:

        """Create a new user document."""
        
        return {

            "_id": ObjectId(),
            "apodo": data["apodo"],
            "nombre_completo": data["nombre_completo"],
            "email": data["email"],
            "password_hash": data["password_hash"],
            "genero": data["genero"],
            "fecha_nacimiento": datetime.combine(data["fecha_nacimiento"], datetime.min.time()),
            "altura_cm": data["altura_cm"],
            "peso_actual": data["peso_actual"],
            "fecha_registro": datetime.now(),
            "nivel_actividad": data["nivel_actividad"],
            #Objetivo"tipo_objetivo": data["tipo_objetivo"],
            #Objetivo"peso_objetivo": data["peso_objetivo"],
            #Plan"cantidad_comidas": data["cantidad_comidas"],
            "enfermedad": data["enfermedad"],
            "tipo_actividad": data["tipo_actividad"],
            #Plan"tipo_dieta": data["tipo_dieta"],
            #Plan"velocidad_dieta": data["velocidad_dieta"],
            #Despensa"ingredientes": data["ingredientes"],

            "gemas_acumuladas": 0,
            "ultimo_login": None,
            "ultima_actualizacion_peso": None,
            "activo": True,
            "tiene_plan": False,
            "id_plan": None,

        }