from fastapi import APIRouter, Depends
from app.schemas.dias import DiaResponse
from app.controllers.dias_controller import DiasController
from app.core.auth import get_current_user
from bson import ObjectId

router = APIRouter(
    prefix="/dias",
    tags=["Días"]
)

@router.get("/{dia}", response_model=DiaResponse)
async def get_dia(dia: str, user: dict = Depends(get_current_user)):
    return await DiasController.get_dia_by_nombre(user, dia)