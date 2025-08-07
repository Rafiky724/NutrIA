from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import date, datetime
from enum import Enum
from typing import Optional

class Genero(str, Enum):
    masculino = "masculino"
    femenino = "femenino"
    
class NivelActividad(str, Enum):
    no_hace = "no hace"
    ocasional = "ocasional"
    regular = "regular"
    frecuente = "frecuente"
    
class UsuarioBase(BaseModel):
    apodo: str = Field(..., max_length=50)
    nombre_completo: str = Field(..., max_length=100)
    email: EmailStr
    fecha_nacimiento: Optional[date] = None
    genero: Optional[Genero] = None
    altura_cm: Optional[int] = None
    peso_actual: Optional[float] = None
    nivel_actividad: Optional[NivelActividad] = None
    
    @field_validator("fecha_nacimiento")
    @classmethod
    def validar_fecha_nacimiento(cls, fecha: Optional[date]) -> Optional[date]:
        if fecha and fecha > date.today():
            raise ValueError("La fecha de nacimiento no puede ser una fecha futura.")
        return fecha
    
class UsuarioCreate(UsuarioBase):
    contrasena: str = Field(..., min_length=6)

class UsuarioUpdate(BaseModel):
    apodo: Optional[str] = Field(None, max_length=50)
    nombre_completo: Optional[str] = Field(None, max_length=100)
    email: Optional[EmailStr] = None
    fecha_nacimiento: Optional[date] = None
    genero: Optional[Genero] = None
    altura_cm: Optional[int] = None
    peso_actual: Optional[float] = None
    nivel_actividad: Optional[NivelActividad] = None

class CambiarContrasena(BaseModel):
    contrasena: str
    contrasena_nueva: str = Field(..., min_length=6)
    
class Usuario(UsuarioBase):
    usuario_id: int
    gemas_acumuladas: int = 0
    fecha_registro: datetime
    ultimo_login: Optional[datetime] = None
    ultima_actualizacion_peso: Optional[date] = None
    activo: bool = True

    class Config:
        from_attributes = True