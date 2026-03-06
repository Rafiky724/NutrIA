from fastapi import APIRouter, Depends
from app.schemas.plan import CambiarDiaActualizarRequest, CambiarTipoDietaRequest, PlanMacrosResponse, UserDiaActualizarResponse
from app.controllers.plan_controller import PlanController
from app.core.auth import get_current_user
from bson import ObjectId

router = APIRouter(
    prefix="/plan",
    tags=["Plan"]
)

@router.get("/macros", response_model=PlanMacrosResponse)
async def get_macros_diarios(user: dict = Depends(get_current_user)):
    return await PlanController.get_macros_diarios(user)

@router.get("/dia_actualizar", response_model=UserDiaActualizarResponse)
async def get_user_actualizar_dia(current_user: dict = Depends(get_current_user)):
    return await PlanController.get_user_actualizar_dia(current_user)

@router.post("/cambiar_tipo_dieta")
async def cambiar_tipo_dieta(data: CambiarTipoDietaRequest, current_user: dict = Depends(get_current_user)):
    return await PlanController.cambiar_tipo_dieta(current_user, data)

@router.post("/cambiar_dia_actualizar")
async def cambiar_dia_actualizar(data: CambiarDiaActualizarRequest, current_user: dict = Depends(get_current_user)):
    return await PlanController.cambiar_dia_actualizar(current_user, data)