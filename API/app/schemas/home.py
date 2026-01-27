from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class UsuarioHomeSchema(BaseModel):
    nombre: str
    cantidad_gemas: int
    numero_racha: int

class MacrosSchema(BaseModel):
    calorias: float
    proteinas: float
    carbohidratos: float
    grasas: float
    calorias_objetivo: float
    proteinas_objetivo: float
    carbohidratos_objetivo: float
    grasas_objetivo: float
    seguimiento_racha: list


class ProximaComidaSchema(BaseModel):
    tipo_comida: str
    hora_sugerida: str
    atrasado: bool
    minutos_retraso: int
    calorias: float
    proteinas: float
    carbohidratos: float
    grasas: float
    ingredientes: list

class HomeResponse(BaseModel):
    usuario: UsuarioHomeSchema
    hay_dieta_hoy: bool
    mensaje: Optional[str] = None
    macros_consumidos_hoy: Optional[MacrosSchema] = None
    proxima_comida: Optional[ProximaComidaSchema] = None
    dia_actual: Optional[dict] = None