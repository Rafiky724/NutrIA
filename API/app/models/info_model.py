from app.core.database import db
from datetime import datetime, time, timedelta
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
            "mostroAumentarRacha": data.get("mostroAumentarRacha", False),
            "tomarDecisionMantenerRacha": data.get("tomarDecisionMantenerRacha", False)

        }

        await db.infos_day.insert_one(document)

    @staticmethod
    async def crear_info_day_ayer(user_id, data):
        tz = ZoneInfo("America/Bogota")
        
        # Obtener AYER
        today = datetime.now(tz).date()
        ayer = today - timedelta(days=1)

        # Inicio del día de ayer en Bogotá
        datetime_bogota = datetime.combine(ayer, time(0, 0, 0), tz)

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

    @staticmethod
    async def get_infos_semana_actual(user_id):

        tz = ZoneInfo("America/Bogota")
        
        # 🔹 Ahora sí: datetime completo
        hoy = datetime.now(tz)

        # 🔹 Lunes de esta semana
        inicio_semana = hoy - timedelta(days=hoy.weekday())
        inicio_semana = inicio_semana.replace(hour=0, minute=0, second=0, microsecond=0)

        # 🔹 Fin = hoy
        fin = hoy.replace(hour=23, minute=59, second=59, microsecond=999999)

        docs = await db.infos_day.find({
            "user_id": user_id,
            "fecha": {
                "$gte": inicio_semana,
                "$lte": fin
            }
        }).to_list(length=7)

        docs_map = {
            doc["fecha"].astimezone(tz).date(): doc
            for doc in docs
        }

        resultado = []

        dias_nombre = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]

        for i in range((hoy.date() - inicio_semana.date()).days + 1):
            fecha_actual = inicio_semana + timedelta(days=i)
            fecha_key = fecha_actual.date()

            resultado.append({
                "dia": dias_nombre[i],
                "fecha": fecha_actual,
                "data": docs_map.get(fecha_key)
            })

        return resultado
    
    @staticmethod
    async def actualizar_ya_actualizo_dieta(user_id, ya_actualizo_dieta: bool):
        tz = ZoneInfo("America/Bogota")
        today = datetime.now(tz).date()
        datetime_bogota = datetime.combine(today, time(0, 0, 0), tz)

        await db.infos_day.update_one(
            {
                "user_id": user_id,
                "fecha": datetime_bogota
            },
            {
                "$set": {
                    "YaActualizoDieta": ya_actualizo_dieta
                }
            }
        )

#-1: Dia no completado, no ha pagado por mantener
#1: Completado satisfactoriamente
#2: Completado con ayuda de racha
#3: Día no completado
#4: En curso

#(una lista de 7 números para llevar la racha semanal (1: dia cumplido, -1: dia fallido, 0: dia en proceso, 2: dia sin info))