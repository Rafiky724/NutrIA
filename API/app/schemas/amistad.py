from pydantic import BaseModel
from datetime import datetime

class AmistadCreate(BaseModel):
    usuario_id_1: int
    usuario_id_2: int

class AmistadUpdate(BaseModel):
    bloqueado: bool
    
class AmistadOut(BaseModel):
    amistad_id: int
    usuario_id_1: int
    usuario_id_2: int
    bloqueado: bool
    fecha_amistad: datetime

    class Config:
        from_attributes = True


