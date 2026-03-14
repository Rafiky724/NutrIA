from datetime import datetime
from zoneinfo import ZoneInfo
from bson import ObjectId
from fastapi import HTTPException

from app.models.logros_model import LogrosModel
from app.models.user_model import UserModel
from app.core.database import db

class LogrosController:

    @staticmethod
    async def crear_logros_usuario(current_user, session=None):

        user_id = ObjectId(current_user["_id"])

        existe = await LogrosModel.get_logros_usuario(user_id)

        if existe:
            raise HTTPException(
                status_code=400,
                detail="El usuario ya tiene logros inicializados"
            )
        
        categorias_logros = ["dias_racha", "completar_comidas", "validar_comidas", "conseguir_gemas", "comprar_articulos"]
        descripciones_logros = [["Completa", "días de racha"], ["Completa", "comidas"], ["Valida", "comidas"], ["Consigue", "gemas"], ["Comprar", "artículos"]]
        objetivos_logros = [[5,50,100],[10,100,200],[5,50,100],[50,250,1000],[5,15,30]]
        gemas_recompensas = [15,50,100]
        logros = []
        total = 1
        for i in range(5):
            for j in range(3):
                logro = {
                        "id_logro": f"logro_{total}",
                        "descripcion": f"{descripciones_logros[i][0]} {objetivos_logros[i][j]} {descripciones_logros[i][1]}",
                        "categoria": categorias_logros[i],
                        "objetivo": objetivos_logros[i][j],
                        "gemas_recompensa": gemas_recompensas[j],
                        "progreso_actual": 0,
                        "progreso_anterior": 0,
                        "completado": False,
                        "reclamado": False,
                        "fecha_completado": None
                    }
                logros.append(logro)
                total += 1
        
        
        documento = {

            "id_usuario": user_id,
            "activo": True,
            "logros": logros,
            "creado_en": datetime.now(ZoneInfo("America/Bogota")).date().isoformat(),
            "actualizado_en": None
        }

        await LogrosModel.crear_logros_usuario(documento, session=session)

        return documento
    
    @staticmethod
    async def obtener_logros_usuario(current_user):

        user_id = ObjectId(current_user["_id"])

        documento = await LogrosModel.get_logros_usuario(user_id)

        if not documento:
            raise HTTPException(
                status_code=404,
                detail="El usuario no tiene logros inicializados"
            )

        return documento
    
    @staticmethod
    async def reclamar_logro(data, current_user):

        user_id = ObjectId(current_user["_id"])

        documento = await LogrosModel.get_logros_usuario(user_id)

        if not documento:
            raise HTTPException(
                status_code=404,
                detail="Logros no encontrados"
            )

        logros = documento["logros"]

        logro_encontrado = None

        for logro in logros:

            if logro["id_logro"] == data.id_logro:
                logro_encontrado = logro
                break

        if not logro_encontrado:
            raise HTTPException(
                status_code=404,
                detail="Logro no encontrado"
            )

        if not logro_encontrado["completado"]:
            raise HTTPException(
                status_code=400,
                detail="El logro aún no está completado"
            )

        if logro_encontrado["reclamado"]:
            raise HTTPException(
                status_code=400,
                detail="La recompensa ya fue reclamada"
            )

        gemas_recompensa = logro_encontrado["gemas_recompensa"]

        logro_encontrado["reclamado"] = True
        logro_encontrado["fecha_reclamado"] = datetime.now(ZoneInfo("America/Bogota")).date().isoformat()

        try:
            session = await db.client.start_session()
            async with session:
                async with session.start_transaction():
                    await LogrosModel.actualizar_logros(user_id, logros, session=session)
                    await UserModel.actualizar_gemas(
                        user_id,
                        gemas_recompensa + current_user["gemas_acumuladas"],
                        session=session
                    )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail="Error al reclamar el logro"
            )

        return {
            "mensaje": "Recompensa reclamada correctamente",
            "gemas_recibidas": gemas_recompensa,
            "gemas_actuales": gemas_recompensa + current_user["gemas_acumuladas"],
            "logro": logro_encontrado
        }