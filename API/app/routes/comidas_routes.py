from fastapi import APIRouter, Depends
from app.controllers.comidas_controller import ComidasController
from app.core.auth import get_current_user
from app.schemas.comidas import VerificarComidaResponse

router = APIRouter(prefix="/comidas", tags=["Comidas"])

@router.post("/completar-comida", response_model=VerificarComidaResponse)
async def completar_comida(user: dict = Depends(get_current_user)):
    return await ComidasController.completar_comida(current_user=user)