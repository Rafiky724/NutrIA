from datetime import date, datetime, time
from zoneinfo import ZoneInfo

BOGOTA_TZ = ZoneInfo("America/Bogota")

def get_day_range_bogota(fecha: date | None = None):
    """
    Retorna el rango datetime (inicio, fin) de un día en zona Bogotá.
    Ideal para consultas Mongo por rango.
    """

    if fecha is None:
        fecha = datetime.now(BOGOTA_TZ).date()

    inicio = datetime.combine(
        fecha,
        time.min,
        tzinfo=BOGOTA_TZ
    )

    fin = datetime.combine(
        fecha,
        time.max,
        tzinfo=BOGOTA_TZ
    )

    return inicio, fin

def comparar_horas(hora: str):
    tz = ZoneInfo("America/Bogota")

    hora1 = datetime.strptime(hora, "%I:%M %p")
    ahora = datetime.now(tz)

    hora1 = hora1.replace(
        year=ahora.year,
        month=ahora.month,
        day=ahora.day,
        tzinfo=tz
    )

    print(hora1, ahora)


    diferencia = (hora1 - ahora).total_seconds() / 3600

    if diferencia < -1:
        return {"color": "#260B01", "mensaje": "¡Tu comida está retrasada!", "estado": 2}
    
    elif -1 <= diferencia <= 1:
        return {"color": "#E5E1BD", "mensaje": "¡Es hora de comer!", "estado": 1}
    
    else:  # diferencia > 1
        return {"color": "#FCFCFC", "mensaje": "Próxima comida", "estado": 0}