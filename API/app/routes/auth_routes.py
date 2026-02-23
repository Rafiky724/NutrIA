from datetime import datetime
from zoneinfo import ZoneInfo

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user import UserCreate, UserResponse, UserLogin
from app.controllers.user_controller import UserController

router = APIRouter(

    prefix="/auth",
    tags=["Auth"]

)

@router.post("/register", response_model=UserResponse)
async def register_user(user: UserCreate):
    print(datetime.now(ZoneInfo("America/Bogota")))
    return await UserController.register_user(user)

@router.post("/login")
async def login_user(form_data: OAuth2PasswordRequestForm = Depends()):
    return await UserController.login_user(
        email=form_data.username,
        password=form_data.password
    )