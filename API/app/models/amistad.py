from sqlalchemy import Column, BigInteger, Boolean, TIMESTAMP, func, ForeignKey, UniqueConstraint

from app.core.database import Base

class Amistad(Base):
    __tablename__ = "amistades"
    
    amistad_id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    usuario_id_1 = Column(BigInteger, ForeignKey('usuarios.usuario_id'), nullable=False)
    usuario_id_2 = Column(BigInteger, ForeignKey('usuarios.usuario_id'), nullable=False)
    bloqueado = Column(Boolean, nullable=False, default=False)
    fecha_amistad = Column(TIMESTAMP, nullable=False, server_default=func.current_timestamp())

    #Evitar la misma amistad (A-B) y (B-A)
    __table_args__ = (
        UniqueConstraint('usuario_id_1', 'usuario_id_2', name='uq_amistad_unica'),
    )