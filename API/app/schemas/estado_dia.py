from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from enum import Enum


class IniciarDietaRequest(BaseModel):
    tipo_inicio: str = Field(..., pattern="^(hoy|manana|fecha)$")

    fecha_inicio: Optional[date] = None
    siguiente_comida: Optional[str] = None

    dia_actualizar_dieta: str = Field(..., pattern="^(lunes|martes|miercoles|jueves|viernes|sabado|domingo)$")

    @classmethod
    def validate_logic(cls, data):
        if data.tipo_inicio == "hoy" and not data.siguiente_comida:
            raise ValueError("Debe indicar la siguiente comida si inicia hoy")

        if data.tipo_inicio == "fecha" and not data.fecha_inicio:
            raise ValueError("Debe indicar la fecha de inicio")

        return data