from pydantic import BaseModel
from typing import Optional

class PlanMacrosResponse(BaseModel):
    calorias_diarias: Optional[int]
    proteinas_diarias: Optional[float]
    carbohidratos_diarios: Optional[float]
    grasas_diarias: Optional[float]

class UserDiaActualizarResponse(BaseModel):
    es_dia_actualizar_dieta: bool
    mensaje_actualizacion: Optional[str] = None