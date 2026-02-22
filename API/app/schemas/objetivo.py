from datetime import date
from typing import Optional
from pydantic import BaseModel, Field

class ObjetivoCreate(BaseModel):
    
    id_usuario: str
    tipo_objetivo: str = Field(..., pattern="^(PerderPeso|MantenerPeso|GanarMasaMuscular)$")
    peso_objetivo: float

class ObjetivoFechasResponse(BaseModel):
    fecha_inicio: Optional[date]
    fecha_estimada: Optional[date]