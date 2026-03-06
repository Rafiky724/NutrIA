from pydantic import BaseModel
from typing import List

class DespensaResponse(BaseModel):
    ingredientes: List[dict]