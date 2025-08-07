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
    fecha_nacimiento = Column(Date, nullable=False)
    genero = Column(Enum(Genero), default=Genero.masculino)
    altura_cm = Column(Integer, nullable=False)
    peso_actual = Column(Float, nullable=False)
    nivel_actividad = Column(Enum(NivelActividad), default=NivelActividad.no_hace)
    gemas_acumuladas = Column(Integer, default=0)
    fecha_registro = Column(TIMESTAMP, nullable=False, server_default='CURRENT_TIMESTAMP')
    ultimo_login = Column(DateTime, nullable=True)
    ultima_actualizacion_peso = Column(Date, nullable=True)
    activo = Column(Boolean, default=True)
    
    # relaciones
    amistades_1 = relationship("Amistad", foreign_keys="[Amistad.usuario_id_1]", backref="usuario1")
    amistades_2 = relationship("Amistad", foreign_keys="[Amistad.usuario_id_2]", backref="usuario2")
    # metas = relationship("Objetivo", back_populates="usuario", cascade="all, delete-orphan")
    # planes = relationship("PlanDietetico", back_populates="usuario", cascade="all, delete-orphan")
    # historiales = relationship("Historial", back_populates="usuario", cascade="all, delete-orphan")
    # logros = relationship("Logro", back_populates="usuario", cascade="all, delete-orphan")
    # mascotas = relationship("Mascota", back_populates="usuario", cascade="all, delete-orphan")
    # notificaciones = relationship("Notificacion", back_populates="usuario", cascade="all, delete-orphan")
    # comidas_verificadas = relationship("VerificacionComida", back_populates="usuario", cascade="all, delete-orphan")
    
    #Propiedad para obtener todos los amigos
    @property
    def amistades(self):
        return self.amistades_1 + self.amistades_2
    
from app.models.amistad import Amistad