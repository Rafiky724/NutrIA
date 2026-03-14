from fastapi import APIRouter, Depends
from app.controllers.logros_controller import LogrosController
from app.core.auth import get_current_user
from app.schemas.logros import LogrosUsuarioResponse

router = APIRouter(prefix="/logros", tags=["Logros"])

@router.get("/", response_model=LogrosUsuarioResponse)
async def obtener_logros_usuario(current_user: dict = Depends(get_current_user)):
    return await LogrosController.obtener_logros_usuario(current_user)