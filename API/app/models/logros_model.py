from datetime import datetime
from zoneinfo import ZoneInfo

from app.core.database import db

class LogrosModel:

    @staticmethod
    async def crear_logros_usuario(data, session=None):
        kwargs = {}
        if session is not None:
            kwargs["session"] = session
        return await db.logros_usuarios.insert_one(data, **kwargs)

    @staticmethod
    async def get_logros_usuario(user_id):

        return await db.logros_usuarios.find_one(
            {"id_usuario": user_id},
            {"_id": 0, "logros": 1}
        )
    
    @staticmethod
    async def actualizar_logros(user_id, logros, session=None):
        kwargs = {}
        if session is not None:
            kwargs["session"] = session
        return await db.logros_usuarios.update_one(
            {"id_usuario": user_id},
            {"$set": {"logros": logros}},
            **kwargs
        )

    @staticmethod
    async def actualizar_logros_por_categoria(user_id, categoria, nuevo_valor):

        # 🔹 1. Traer documento
        doc = await db.logros_usuarios.find_one({
            "id_usuario": user_id,
            "activo": True
        })

        if not doc:
            return None

        logros = doc.get("logros", [])
        hoy_str = datetime.now(ZoneInfo("America/Bogota")).strftime("%Y-%m-%d")

        # 🔹 2. Procesar logros
        for logro in logros:

            if logro.get("categoria") != categoria:
                continue

            progreso_actual = logro.get("progreso_actual", 0)

            # 🔄 mover valores
            logro["progreso_anterior"] = progreso_actual
            logro["progreso_actual"] = nuevo_valor

            # ✅ verificar si se completa
            if not logro.get("completado") and nuevo_valor >= logro.get("objetivo", 0):
                logro["completado"] = True
                logro["fecha_completado"] = hoy_str

        # 🔹 3. Guardar cambios
        await db.logros_usuarios.update_one(
            {"_id": doc["_id"]},
            {
                "$set": {
                    "logros": logros,
                    "actualizado_en": hoy_str
                }
            }
        )

        return logros