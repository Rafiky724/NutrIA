from fastapi import APIRouter, Depends
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.usuario import Usuario
from app.schemas.usuario import Usuario as UsuarioSchema 
from app.core.database import get_db 

router = APIRouter()

@router.get("/usuarios/", response_model=list[UsuarioSchema])
async def obtener_usuarios(db: AsyncSession = Depends(get_db)):
    query = select(Usuario)
    result = await db.execute(query)
    db_usuarios = result.scalars().all()

    return db_usuarios