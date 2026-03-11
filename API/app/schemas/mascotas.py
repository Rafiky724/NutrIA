from typing import Optional

from pydantic import BaseModel, Field

class CrearMascotaRequest(BaseModel):
    tipo_mascota: str = Field(..., pattern="^(nutria|perro|gato)$")
    nombre: str = Field(..., min_length=2, max_length=30)

class ComprarItemRequest(BaseModel):
    categoria: str
    item_id: str
    nombre_mascota: Optional[str] = None