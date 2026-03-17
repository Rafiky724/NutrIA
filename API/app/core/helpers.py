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