from typing import Optional
from pydantic import BaseModel, Field


class VerificarComidaResponse(BaseModel):
    mensaje: str
    comida_completada: str
    nueva_comida_actual: Optional[str] = None
    racha_actual: int

class VerificarComidaRequest(BaseModel):

    descripcion: str = Field(..., min_length=10, max_length=1000)

class ComidaAnalysisResponse(BaseModel):
    match: bool