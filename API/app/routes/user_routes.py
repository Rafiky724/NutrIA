from fastapi import APIRouter, Depends
from bson import ObjectId
from app.controllers.user_controller import UserController
from app.core.auth import get_current_user
from app.schemas.user import EditarPerfilRequest, PerfilUsuarioResponse, UserPesoResponse, UserPesoUpdateRequest, UserProgressResponse, UserTienePlanResponse

router = APIRouter(
    prefix="/user",
    tags=["User"]
)

@router.get("/tiene-plan", response_model=UserTienePlanResponse)
async def get_tiene_plan(current_user: dict = Depends(get_current_user)):
    user_id = ObjectId(current_user["_id"])
    return await UserController.get_tiene_plan(user_id)

@router.get("/progress", response_model=UserProgressResponse)
async def get_user_progress(current_user: dict = Depends(get_current_user)):
    return await UserController.get_user_progress(current_user)

@router.get("/peso", response_model=UserPesoResponse)
async def get_user_peso(current_user: dict = Depends(get_current_user)):
    return await UserController.get_user_peso(current_user)

@router.post("/actualizar_peso")
async def update_user_peso(peso: UserPesoUpdateRequest, current_user: dict = Depends(get_current_user)):
    return await UserController.update_user_peso(current_user, nuevo_peso=peso.peso_actual)

@router.get("/perfil", response_model=PerfilUsuarioResponse)
async def get_perfil_usuario(current_user: dict = Depends(get_current_user)):
    return await UserController.get_perfil_usuario(current_user)

@router.put("/editar-perfil", response_model=PerfilUsuarioResponse)
async def editar_perfil(data: EditarPerfilRequest, current_user: dict = Depends(get_current_user)):
    return await UserController.editar_perfil(data, current_user)