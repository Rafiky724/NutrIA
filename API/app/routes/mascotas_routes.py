from fastapi import APIRouter, Depends

from app.controllers.mascotas_controller import MascotasController
from app.schemas.mascotas import CrearMascotaRequest
from app.core.auth import get_current_user

router = APIRouter(prefix="/mascotas", tags=["Mascotas"])

@router.post("/adoptar")
async def crear_mascota_usuario(data: CrearMascotaRequest, current_user: dict = Depends(get_current_user)):
    return await MascotasController.crear_mascota_usuario(current_user, data)

@router.post("/init")
async def inicializar_tienda():
    return await MascotasController.crear_tienda()

@router.get("/tienda")
async def get_tienda_mascotas(current_user: dict = Depends(get_current_user)):
    return await MascotasController.get_tienda_mascotas(current_user)


@router.get("/{categoria}")
async def get_items_categoria(categoria: str,current_user: dict = Depends(get_current_user)):
    return await MascotasController.get_items_categoria(categoria, current_user)