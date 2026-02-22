from datetime import datetime

class PlanModel:

    @staticmethod
    def new_plan(data: dict) -> dict:

        """Create a new plan document."""
        
        return {

            "id_usuario": data["_id"],
            "fecha_inicio": None,
            "fecha_fin": None,
            "cantidad_comidas": data["cantidad_comidas"],
            "tipo_dieta": data["tipo_dieta"],
            "velocidad_dieta": data["velocidad_dieta"],
            "proteinas_diarias": None,
            "carbohidratos_diarios": None,
            "grasas_diarias": None,
            "calorias_diarias": None,
            "presupuesto_semanal": None,
            "creado_en": datetime.now(),
            "activo": True

        }