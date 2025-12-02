from fastapi import APIRouter
from app.schemas.user import UserCreate, UserResponse, UserLogin
from app.controllers.user_controller import UserController

router = APIRouter(

    prefix="/auth",
    tags=["Auth"]

)

@router.post("/register", response_model=UserResponse)
async def register_user(user: UserCreate):
    return await UserController.register_user(user)

@router.post("/login")
async def login_user(user: UserLogin):
    return await UserController.login_user(user)