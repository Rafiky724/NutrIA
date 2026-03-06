from datetime import datetime
from zoneinfo import ZoneInfo
from bson import ObjectId
from fastapi import HTTPException
from app.core.database import db
from app.models.plan_model import PlanModel

class PlanController:

    dias = [
        "lunes", "martes", "miercoles",
        "jueves", "viernes", "sabado", "domingo"
    ]

    @staticmethod
    async def create_plan(plan_data: dict, session=None):

        """Create a new plan for a user."""
        plan_document = PlanModel.new_plan(plan_data)
        result = await db.planes.insert_one(plan_document, session=session)
        return result.inserted_id
    
    @staticmethod
    async def update_plan_from_dieta(user_id: ObjectId, plan_update: dict, session=None):
        result = await db.planes.update_one(
            {"id_usuario": user_id},
            {"$set": plan_update},
            session=session
        )

        if result.matched_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Plan no encontrado para el usuario"
            )
        
    @staticmethod
    async def get_macros_diarios(current_user: dict) -> dict:

        user_id = ObjectId(current_user["_id"])

        plan = await db.planes.find_one(
            {"id_usuario": user_id, "activo": True},
            {
                "_id": 0,
                "calorias_diarias": 1,
                "proteinas_diarias": 1,
                "carbohidratos_diarios": 1,
                "grasas_diarias": 1
            }
        )

        if not plan:
            raise HTTPException(status_code=404, detail="Plan activo no encontrado")

        return plan
    
    @staticmethod
    async def get_user_actualizar_dia(current_user: dict):

        user_id = ObjectId(current_user["_id"])

        es_dia_actualizar_dieta = False
        mensaje = None

        plan = await db.planes.find_one({
            "id_usuario": user_id
        })
    

        if plan:

            dia_actualizar = plan.get("dia_actualizar_dieta")

            hoy_es = PlanController.dias[datetime.now(ZoneInfo("America/Bogota")).weekday()]

            if dia_actualizar == hoy_es:
                es_dia_actualizar_dieta = True
            else:
                mensaje = (
                    f"El día {dia_actualizar} será cuando puedas generar tu nuevo "
                    f"plan semanal de alimentación. Mantente atento para actualizar "
                    f"tu dieta y seguir progresando."
                )

        return {
            "es_dia_actualizar_dieta": es_dia_actualizar_dieta,
            "mensaje_actualizacion": mensaje
        }
    

    @staticmethod
    async def cambiar_tipo_dieta(current_user: dict, data: dict):

        user_id = ObjectId(current_user["_id"])
    
        plan = await PlanModel.get_plan_by_user_id(user_id)

        if not plan:
            raise HTTPException(
                status_code=404,
                detail="El usuario no tiene un plan activo"
            )

        tipo_dieta = data.tipo_dieta

        if tipo_dieta not in ["Presupuesto", "Disponible"]:
            raise HTTPException(
                status_code=400,
                detail="tipo_dieta debe ser 'Presupuesto' o 'Disponible'"
            )

        presupuesto = None

        if tipo_dieta == "Presupuesto":

            if data.presupuesto_semanal is None:
                raise HTTPException(
                    status_code=400,
                    detail="Debes enviar presupuesto_semanal para este tipo de dieta"
                )

            presupuesto = data.presupuesto_semanal

        try:

            await PlanModel.actualizar_tipo_dieta(user_id, tipo_dieta, presupuesto)

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail="Error al actualizar el tipo de dieta"
            )

        return {
            "mensaje": "Tipo de dieta actualizado correctamente",
            "tipo_dieta": tipo_dieta,
            "presupuesto_semanal": presupuesto
        }