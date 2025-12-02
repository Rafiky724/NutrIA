"""
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# Crear engine desde la URL en .env
engine = create_async_engine(settings.DATABASE_URL, pool_pre_ping=True)

# Crear sesión
SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession, 
    expire_on_commit=False,
    )

# Base para modelos ORM
Base = declarative_base()

# Función para inyectar sesión en FastAPI o cualquier parte
async def get_db():
    async with SessionLocal() as db:
        try:
            yield db
        finally:
            await db.close()
"""

from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings

client = AsyncIOMotorClient(settings.MONGO_URI)
db = client[settings.DB_NAME]