from pydantic import BaseModel
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
    apodo: str
    nombre_completo: str
    email: str
    contrasena_hash: str
    fecha_nacimiento: Optional[date] = None
    genero: Optional[Genero] = None
    altura_cm: Optional[int] = None
    peso_actual: Optional[float] = None
    nivel_actividad: Optional[NivelActividad] = None
    gemas_acumuladas: int = 0
    ultimo_login: Optional[datetime] = None
    ultima_actualizacion_peso: Optional[date] = None
    activo: bool = True
    
class UsuarioCreate(UsuarioBase):
    pass

class UsuarioUpdate(UsuarioBase):
    pass

class Usuario(UsuarioBase):
    usuario_id: int
    fecha_registro: datetime

    class Config:
        from_attributes = True