from fastapi import APIRouter, Depends
from bson import ObjectId
from app.controllers.user_controller import UserController
from app.core.auth import get_current_user
from app.schemas.user import UserProgressResponse, UserTienePlanResponse

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