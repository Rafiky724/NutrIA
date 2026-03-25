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

    diferencia = (ahora - hora1).total_seconds() / 3600

    if diferencia > 1:
        return {"color": "#260B01", "mensaje": "¡Tu comida está retrasada!", "estado": 2}
    
    elif 0 <= diferencia <= 1:
        return {"color": "#E5E1BD", "mensaje": "¡Es hora de comer!", "estado": 1}
    
    else:  # diferencia < 0
        return {"color": "#FCFCFC", "mensaje": "Próxima comida", "estado": 0}



def comparar_con_hoy_bogota(fecha_mongo) -> str:
    """
    Compara una fecha de Mongo (UTC) con el inicio del día actual en Bogotá.
    
    Retorna:
        "antes"   -> si es de un día anterior
        "hoy"     -> si es el mismo día
        "despues" -> si es un día futuro
    """

    # Zona horaria Bogotá
    tz_bogota = ZoneInfo("America/Bogota")

    # Convertir fecha de Mongo (UTC) a Bogotá
    fecha_bogota = fecha_mongo.astimezone(tz_bogota)

    # Inicio del día actual en Bogotá
    hoy = datetime.now(tz_bogota).date()
    inicio_hoy = datetime.combine(hoy, time(0, 0, 0), tz_bogota)

    # Comparar solo por fecha (más seguro)
    if fecha_bogota.date() < inicio_hoy.date():
        return "antes"
    elif fecha_bogota.date() > inicio_hoy.date():
        return "despues"
    else:
        return "hoy"
    
def es_mismo_dia_colombia(fecha_mongo: datetime) -> bool:

    # Zona horaria de Colombia
    tz_colombia = ZoneInfo("America/Bogota")

    # Convertir fecha de Mongo (UTC) a hora Colombia
    fecha_col = fecha_mongo.astimezone(tz_colombia)

    # Obtener fecha actual en Colombia
    ahora_col = datetime.now(tz_colombia)

    # Comparar solo año, mes y día
    return (
        fecha_col.year == ahora_col.year and
        fecha_col.month == ahora_col.month and
        fecha_col.day == ahora_col.day
    )