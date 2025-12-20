from fastapi import APIRouter, Depends
from app.core.auth import get_current_user
from app.controllers.dieta_controller import DietaController

router = APIRouter(
    prefix="/dieta",
    tags=["Dieta"]
)

@router.get("/create")
async def create_dieta(user: dict = Depends(get_current_user)):
    return await DietaController.create_dieta(user)