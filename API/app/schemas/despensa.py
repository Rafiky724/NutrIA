from pydantic import BaseModel
from typing import List

class DespensaResponse(BaseModel):
    ingredientes: List[dict]

class DespensaResponse(BaseModel):
    ingredientes: List[dict]


class DespensaUpdateRequest(BaseModel):
    ingredientes: List[dict]

class VerificarIngredienteRequest(BaseModel):
    ingrediente: str

class VerificarIngredienteResponse(BaseModel):
    esIngrediente: bool