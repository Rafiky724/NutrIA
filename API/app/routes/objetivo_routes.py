from fastapi import APIRouter, Depends
from app.core.auth import get_current_user
from app.schemas.objetivo import ObjetivoFechasResponse
from app.controllers.objetivo_controller import ObjetivoController

router = APIRouter(
    prefix="/objetivo",
    tags=["Objetivo"]
)

@router.get("/fechas", response_model=ObjetivoFechasResponse)
async def get_fechas_objetivo(user: dict = Depends(get_current_user)):
    return await ObjetivoController.get_fechas_objetivo(user)