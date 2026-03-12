from fastapi import APIRouter, Depends
from app.controllers.despensa_controller import DespensaController
from app.schemas.despensa import DespensaResponse, DespensaUpdateRequest
from app.core.auth import get_current_user

router = APIRouter(prefix="/despensa", tags=["Despensa"])


@router.get("/ingredientes", response_model=DespensaResponse)
async def get_ingredientes_usuario(current_user: dict = Depends(get_current_user)):
    return await DespensaController.get_ingredientes_usuario(current_user)

@router.put("/actualizar_ingredientes")
async def update_ingredientes_usuario(data: DespensaUpdateRequest, current_user: dict = Depends(get_current_user)):
    return await DespensaController.update_ingredientes_usuario(current_user,data)