from pydantic import BaseModel, EmailStr, Field
from datetime import date
from typing import Optional

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

