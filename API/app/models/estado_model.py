from app.core.database import db

class EstadoModel:

    @staticmethod
    async def get_estado_dia_por_fecha(plan_id, inicio, fin):
        return await db.estados_dia.find_one({
            "plan_id": plan_id,
            "fecha": {
                "$gte": inicio,
                "$lte": fin
            },
            "activo": True
        }, {"_id": 0})
    
    @staticmethod
    async def get_estado_dia_por_fecha_id(plan_id, inicio, fin):
        return await db.estados_dia.find_one({
            "plan_id": plan_id,
            "fecha": {
                "$gte": inicio,
                "$lte": fin
            },
            "activo": True
        })
    
    @staticmethod
    async def get_estado_dia_por_dia(plan_id, dia):
        return await db.estados_dia.find_one({
            "plan_id": plan_id,
            "dia_semana": dia,
            "activo": True
        }, {"_id": 0})

    @staticmethod
    async def edit_estado_dia(plan_id, estado, dia_semana, session=None):
        """Actualiza el estado de un día en la colección estados_dia.

        Args:
            plan_id: ObjectId del plan.
            estado: Diccionario de la dieta (sin _id / sin plan_id).
            dia_semana: Nombre del día de la semana (ej. 'lunes').
            session: Sesión opcional de MongoDB.
        """

        return await db.estados_dia.update_one(
            {"plan_id": plan_id, "dia_semana": dia_semana, "activo": True},
            {"$set": {"dieta": estado}},
            session=session
        )
    

    """
    async def actualizar_estado_dia(user_id, estado, session=None):
        kwargs = {}
        if session is not None:
            kwargs["session"] = session
        return await db.estados_dia.update_one(
            {"id_usuario": user_id},
            {"$set": estado},
            **kwargs
        )"""
    
    """
    @staticmethod
    async def update_estado_comida(plan_id, comida, index, dia_semana, session=None):

        return await db.estados_dia.update_one(
            {
                "plan_id": plan_id,
                "dia_semana": dia_semana,
                "activo": True
            },
            {
                "$set": {
                    f"dieta.comidas.{index}": comida
                }
            },
            session=session
        )"""
    
    @staticmethod
    async def update_estado_completo(plan_id, dia_semana, data):

        return await db.estados_dia.update_one(
            {"plan_id": plan_id,
                "dia_semana": dia_semana,
                "activo": True},
            {"$set": data}
        )