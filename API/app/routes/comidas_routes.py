from fastapi import APIRouter, Depends, File, Form, UploadFile
from app.controllers.comidas_controller import ComidasController
from app.core.auth import get_current_user
from app.schemas.comidas import ComidaAnalysisResponse, VerificarComidaRequest, VerificarComidaResponse

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

@router.put("/reemplazar_comida_actual")
async def reemplazar_comida_actual(data: VerificarComidaRequest, user: dict = Depends(get_current_user)):
    return  await ComidasController.verificar_y_reemplazar_comida(data, current_user=user)


@router.post("/analizar_comida", response_model=ComidaAnalysisResponse)
async def analizar_comida(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """
    Endpoint para analizar si una imagen de comida coincide con lo esperado.

    - file: imagen (jpg/png)
    - expected_food: comida esperada (string)
    """

    return await ComidasController.analizar_comida_modelo(
        file=file,
        user=current_user
    )