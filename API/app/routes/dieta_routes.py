from fastapi import APIRouter, Depends
from app.core.auth import get_current_user
from app.controllers.dieta_controller import DietaController
from app.schemas.estado_dia import IniciarDietaRequest

router = APIRouter(
    prefix="/dieta",
    tags=["Dieta"]
)

@router.get("/create")
async def create_dieta(user: dict = Depends(get_current_user)):
    return await DietaController.create_dieta(user)

@router.post("/iniciar")
async def iniciar_dieta(payload: IniciarDietaRequest, user: dict = Depends(get_current_user)):
    return await DietaController.iniciar_dieta(current_user=user, payload=payload)