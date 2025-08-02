from sqlalchemy import BigInteger, Column, Date, Integer, String, Enum, Boolean, Float, TIMESTAMP, DateTime
from app.core.database import Base
from sqlalchemy.orm import relationship
import enum

class Genero(enum.Enum):
    masculino = "masculino"
    femenino = "femenino"
    
class NivelActividad(enum.Enum):
    no_hace = "no hace"
    ocasional = "ocasional"
    regular = "regular"
    frecuente = "frecuente"
    
class Usuario(Base):
    __tablename__ = 'usuarios'
    
    usuario_id = Column(BigInteger, primary_key=True, autoincrement=True)
    apodo = Column(String(50), nullable=False)
    nombre_completo = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    contrasena_hash = Column(String(255), nullable=False)
    fecha_nacimiento = Column(Date, nullable=True)
    genero = Column(Enum(Genero), nullable=True)
    altura_cm = Column(Integer, nullable=True)
    peso_actual = Column(Float, nullable=True)
    nivel_actividad = Column(Enum(NivelActividad), nullable=True)
    gemas_acumuladas = Column(Integer, default=0)
    fecha_registro = Column(TIMESTAMP, nullable=False, server_default='CURRENT_TIMESTAMP')
    ultimo_login = Column(DateTime, nullable=True)
    ultima_actualizacion_peso = Column(Date, nullable=True)
    activo = Column(Boolean, default=True)