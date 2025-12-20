from fastapi import APIRouter, Depends
from app.schemas.plan import PlanMacrosResponse
from app.controllers.plan_controller import PlanController
from app.core.auth import get_current_user
from bson import ObjectId

router = APIRouter(
    prefix="/plan",
    tags=["Plan"]
)

@router.get("/macros", response_model=PlanMacrosResponse)
async def get_macros_diarios(user: dict = Depends(get_current_user)):
    return await PlanController.get_macros_diarios(user)