from fastapi import APIRouter, Depends
from app.controllers.comidas_controller import ComidasController
from app.core.auth import get_current_user
from app.schemas.comidas import VerificarComidaResponse

router = APIRouter(prefix="/comidas", tags=["Comidas"])

@router.post("/completar_comida", response_model=VerificarComidaResponse)
async def completar_comida(user: dict = Depends(get_current_user)):
    return await ComidasController.completar_comida(current_user=user)

@router.post("/cancelar_comida")
async def cancelar_comida(user: dict = Depends(get_current_user)):
    return await ComidasController.cancelar_comida(current_user=user)

@router.post("/salvar_racha")
async def salvar_racha(user: dict = Depends(get_current_user)):
    return await ComidasController.pagar_por_mantener_racha(current_user=user)

@router.post("/perder_racha")
async def perder_racha(user: dict = Depends(get_current_user)):
    return await ComidasController.perder_racha(current_user=user)