from bson import ObjectId
from datetime import datetime
from app.core.database import db


class MascotaUsuarioModel:

    @staticmethod
    async def get_mascota_usuario(user_id: ObjectId):
        return await db.mascotas_usuarios.find_one(
            {"id_usuario": user_id}
        )

    @staticmethod
    async def crear_mascota_usuario(data: dict):
        return await db.mascotas_usuarios.insert_one(data)

    @staticmethod
    async def get_tienda():
        return await db.tienda.find_one({"_id": "tienda_principal"})

    @staticmethod
    async def crear_tienda(data: dict):
        return await db.tienda.insert_one(data)