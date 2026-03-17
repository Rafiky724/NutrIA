from app.core.database import db

class DiaModel:

    @staticmethod
    async def get_dia_user(plan_id, fecha):
        return await db.dias.find_one(
            {
                "id_plan": plan_id,
                "dia_semana": fecha
            },
            {"_id": 0}
        )