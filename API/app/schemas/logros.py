from typing import List, Optional
from pydantic import BaseModel


class LogroResponse(BaseModel):

    id_logro: str
    descripcion: str
    categoria: str

    objetivo: int
    gemas_recompensa: int

    progreso_actual: int
    progreso_anterior: int

    completado: bool
    reclamado: bool

    fecha_completado: Optional[str] = None


class LogrosUsuarioResponse(BaseModel):

    logros: List[LogroResponse]