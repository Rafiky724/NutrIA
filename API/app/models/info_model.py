from app.core.database import db
from datetime import datetime, time
from zoneinfo import ZoneInfo


class InfoModel:

    @staticmethod
    async def crear_info_day(user_id, data):
        tz = ZoneInfo("America/Bogota")
        today = datetime.now(tz).date()
        datetime_bogota = datetime.combine(today, time(0, 0, 0), tz)

        document = {
            "user_id": user_id,
            "fecha": datetime_bogota,
            "estado_dia": data.get("estado_dia", False),
            "enDiaAnterior": data.get("enDiaAnterior", False),
            "mostroModalActualizacionDieta": data.get("mostroModalActualizacionDieta", False),
            "mostroPerderRacha": data.get("mostroPerderRacha", False),
            "TomoDecisionPerderRacha": data.get("TomoDecisionPerderRacha", False),
            "mostroAumentarRacha": data.get("mostroAumentarRacha", False)
        }

        await db.infos_day.insert_one(document)


    @staticmethod
    async def get_info_day_por_fecha(user_id, inicio, fin):
        return await db.infos_day.find_one({
            "user_id": user_id,
            "fecha": {
                "$gte": inicio,
                "$lte": fin
            }
        }, {"_id": 0})
    
    @staticmethod
    async def update_info_day_por_fecha(user_id, inicio, fin, data):

        return await db.infos_day.update_one({
            "user_id": user_id,
            "fecha": {
                    "$gte": inicio,
                    "$lte": fin
                },
                },
            {"$set": data}
        )

#-1: Dia no completado, no ha pagado por mantener
#1: Completado satisfactoriamente
#2: Completado con ayuda de racha
#3: Día no completado
#4: En curso