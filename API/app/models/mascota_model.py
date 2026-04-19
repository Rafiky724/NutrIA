from bson import ObjectId
from datetime import datetime
from app.core.database import db


class MascotaModel:

    @staticmethod
    async def get_mascota_usuario(user_id: ObjectId):
        return await db.mascotas_usuarios.find_one(
            {"id_usuario": user_id}
        )

    @staticmethod
    async def crear_mascota_usuario(data: dict, session=None):
        kwargs = {}
        if session is not None:
            kwargs["session"] = session
        return await db.mascotas_usuarios.insert_one(data, **kwargs)

    @staticmethod
    async def get_tienda():
        return await db.tienda.find_one({"_id": "tienda_principal"})

    @staticmethod
    async def crear_tienda(data: dict):
        return await db.tienda.insert_one(data)
    
    @staticmethod
    async def get_mascotas_usuario(user_id: ObjectId):
        return await db.mascotas_usuarios.find_one({"id_usuario": user_id})
    
    @staticmethod
    async def actualizar_mascota_usuario(user_id: ObjectId, data, session=None):
        """Update the document for a user's pets. Accepts an optional MongoDB
        session to participate in transactions.
        """
        kwargs = {}
        if session is not None:
            kwargs["session"] = session
        return await db.mascotas_usuarios.update_one(
            {"id_usuario": user_id},
            {"$set": data},
            **kwargs
        )
    
    @staticmethod
    async def actualizar_nombre_mascota(user_id: ObjectId, mascotas, session=None):
        """Update the list of mascotas for a user, used when renaming the
        active pet. Accepts optional session for transactional usage.
        """
        kwargs = {}
        if session is not None:
            kwargs["session"] = session
        return await db.mascotas_usuarios.update_one(
            {"id_usuario": user_id},
            {"$set": {"mascotas": mascotas}},
            **kwargs
        )

    @staticmethod
    async def get_mascota_activa_estado(user_id: ObjectId):

        mascota = await db.mascotas_usuarios.find_one({"id_usuario": user_id})

        if not mascota:
            return None

        #print(mascota)
        mascota_activa_tipo = mascota["mascota_activa"]
        estado_mascota = mascota["mascotas"][0]['estado']
        #mascota_activa_tipo = None
        #estado_mascota = None

        return mascota_activa_tipo, estado_mascota
    
    @staticmethod
    async def actualizar_estado_mascota_usuario(user_id: ObjectId, estado):

        return await db.mascotas_usuarios.update_one(
            {"id_usuario": user_id},
            {
                "$set": {
                    "mascotas.0.estado": estado
                }
            }
        )
