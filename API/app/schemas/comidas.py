from typing import Optional
from pydantic import BaseModel


class VerificarComidaResponse(BaseModel):
    mensaje: str
    comida_completada: str
    nueva_comida_actual: Optional[str] = None
    racha_actual: int

class VerificarComidaRequest(BaseModel):

    descripcion: str