from fastapi import APIRouter, Depends
from app.schemas.dias import DiaResponse, EditarComidaRequest, EditarComidaResponse
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

@router.post("/{dia}/comidas/{tipo_comida}/editar", response_model=EditarComidaResponse)
async def editar_comida(dia: str, tipo_comida: str, payload: EditarComidaRequest, user: dict = Depends(get_current_user)):
    return await DiasController.editar_comida_dia(user=user, dia=dia, tipo_comida=tipo_comida, ingredientes=payload.ingredientes)

@router.post("/{dia}/comidas/{tipo_comida}/regenerar", response_model=EditarComidaResponse)
async def regenerar_comida(dia: str, tipo_comida: str, user: dict = Depends(get_current_user)):
    return await DiasController.regenerar_comida_dia(user=user, dia=dia, tipo_comida=tipo_comida)