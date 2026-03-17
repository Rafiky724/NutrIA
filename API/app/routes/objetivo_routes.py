from fastapi import APIRouter, Depends
from app.core.auth import get_current_user
from app.schemas.objetivo import ActualizarObjetivoRequest, ObjetivoFechasResponse
from app.controllers.objetivo_controller import ObjetivoController

router = APIRouter(
    prefix="/objetivo",
    tags=["Objetivo"]
)

@router.get("/fechas", response_model=ObjetivoFechasResponse)
async def get_fechas_objetivo(user: dict = Depends(get_current_user)):
    return await ObjetivoController.get_fechas_objetivo(user)

@router.put("/actualizar")
async def actualizar_objetivo_usuario(data: ActualizarObjetivoRequest, user: dict = Depends(get_current_user)):
    return await ObjetivoController.actualizar_objetivo_usuario(user, data)