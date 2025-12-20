from pydantic import BaseModel, EmailStr, Field
from datetime import date
from typing import Optional, List, Literal

CantidadComidas = Literal[
    "Desayuno",
    "Snack1",
    "Almuerzo",
    "Snack2",
    "Cena",
    "Snack3"
]


class UserCreate(BaseModel):
    apodo: str = Field(..., min_length=3, max_length=30)
    nombre_completo: str = Field(..., min_length=3, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)
    genero: str = Field(..., pattern="^(Masculino|Femenino)$")
    fecha_nacimiento: date
    altura_cm: float
    peso_actual: float
    nivel_actividad: str = Field(..., pattern="^(NoHace|Bajo|Moderado|Alto)$")
    tipo_objetivo: str = Field(..., pattern="^(PerderPeso|MantenerPeso|GanarMasaMuscular)$")
    peso_objetivo: float
    cantidad_comidas: List[CantidadComidas]
    enfermedad: str = Field(..., min_length=0, max_length=900)
    tipo_actividad: str
    tipo_dieta: str = Field(..., pattern="^(Disponible|Presupuesto)$")
    velocidad_dieta: str = Field(..., pattern="^(Lenta|Moderada|Rápida)$")
    ingredientes: List[List[str]] = Field(..., min_length=3)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    user_id: str
    apodo: str
    nombre_completo: str
    email: EmailStr
    genero: str
    fecha_nacimiento: date
    altura_cm: float
    peso_actual: float
    fecha_registro: date
    gemas_acumuladas: int

