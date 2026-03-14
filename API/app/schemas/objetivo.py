from datetime import date
from typing import List, Optional
from pydantic import BaseModel, Field

from app.schemas.user import CantidadComidas

class ObjetivoCreate(BaseModel):
    
    id_usuario: str
    tipo_objetivo: str = Field(..., pattern="^(PerderPeso|MantenerPeso|GanarMasaMuscular)$")
    peso_objetivo: float

class ObjetivoFechasResponse(BaseModel):
    fecha_inicio: Optional[date]
    fecha_estimada: Optional[date]

class ActualizarObjetivoRequest(BaseModel):
    tipo_objetivo: str = Field(None, pattern="^(PerderPeso|MantenerPeso|GanarMasaMuscular)$") #objetivos
    nivel_actividad: str = Field(..., pattern="^(NoHace|Bajo|Moderado|Alto)$") #users
    peso_objetivo: float #objetivos
    cantidad_comidas: List[CantidadComidas] #planes
    tipo_actividad: str #users
    velocidad_dieta: str = Field(..., pattern="^(Lenta|Moderada|Rápida)$") #planes