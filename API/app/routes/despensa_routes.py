from fastapi import APIRouter, Depends
from app.controllers.despensa_controller import DespensaController
from app.schemas.despensa import DespensaResponse
from app.core.auth import get_current_user

router = APIRouter(prefix="/despensa", tags=["Despensa"])


@router.get("/ingredientes", response_model=DespensaResponse)
async def get_ingredientes_usuario(current_user: dict = Depends(get_current_user)):
    return await DespensaController.get_ingredientes_usuario(current_user)