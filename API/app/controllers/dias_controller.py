from typing import List
from bson import ObjectId
from fastapi import HTTPException
from app.core.database import db

class DiasController:

    DIAS_VALIDOS = {
    "lunes", "martes", "miercoles",
    "jueves", "viernes", "sabado", "domingo"
    }

    @staticmethod
    def build_dia_document(plan_id: ObjectId, dia_semana: str, comidas_json: dict) -> dict:
        dia_doc = {
            "plan_id": plan_id,
            "dia_semana": dia_semana,
            "comidas": comidas_json
        }
        return dia_doc

    @staticmethod
    async def build_dias_from_dieta(dias: List[dict], session=None):
        return await db.dias.insert_many(dias, session=session)
    
    @staticmethod
    async def get_dia_by_nombre(current_user: dict, dia: str) -> dict:

        user_id = ObjectId(current_user["_id"])

        dia = dia.lower()
        if dia not in DiasController.DIAS_VALIDOS:
            raise HTTPException(status_code=400, detail="Día inválido")

        plan = await db.planes.find_one(
            {"id_usuario": user_id, "activo": True},
            {"_id": 1}
        )

        if not plan:
            raise HTTPException(status_code=404, detail="Plan activo no encontrado")

        dia_doc = await db.dias.find_one(
            {
                "id_plan": plan["_id"],
                "dia_semana": dia.lower()
            },
            {"_id": 0}
        )

        if not dia_doc:
            raise HTTPException(status_code=404, detail=f"No hay información para {dia}")

        return dia_doc