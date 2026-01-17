from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class IngredienteSchema(BaseModel):
    nombre: str
    tipo: str
    cantidad: str
    calorias_ingrediente: float
    proteinas_ingrediente: float
    carbohidratos_ingrediente: float
    grasas_ingrediente: float

class ComidaSchema(BaseModel):
    tipo_comida: str
    hora_sugerida: Optional[str]
    hora_real: Optional[str]
    calorias: float
    proteinas: float
    carbohidratos: float
    grasas: float
    precio_estimado: Optional[float]
    completada: bool
    verificada: bool
    ingredientes: List[IngredienteSchema]

class DiaResponse(BaseModel):
    dia_semana: str
    calorias_totales: float
    proteinas_totales: float
    carbohidratos_totales: float
    grasas_totales: float
    #costo_total: Optional[float]
    completado: bool
    comidas: List[ComidaSchema]
    created_at: datetime


class OpinionIASchema(BaseModel):
    opinion: str

class EditarComidaRequest(BaseModel):
    ingredientes: List[str]

class EditarComidaResponse(BaseModel):
    dia: DiaResponse
    opinion_ia: str