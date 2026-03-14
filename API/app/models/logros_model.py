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
        