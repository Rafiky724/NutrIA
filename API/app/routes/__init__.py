from fastapi import APIRouter

from app.controllers import usuario

router = APIRouter()

router.include_router(usuario.router, prefix="/api", tags=["Usuarios"])