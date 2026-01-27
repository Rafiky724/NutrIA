from app.controllers.home_controller import HomeController
from fastapi import APIRouter, Depends
from app.core.auth import get_current_user

router = APIRouter(
    prefix="/home",
    tags=["Home"]
)

@router.get("/")
async def get_home(user: dict = Depends(get_current_user)):
    return await HomeController.get_home(current_user=user)