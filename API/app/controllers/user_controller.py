from datetime import datetime
from zoneinfo import ZoneInfo

from bson import ObjectId
from fastapi import HTTPException
from app.controllers.despensa_controller import DespensaController
from app.controllers.plan_controller import PlanController
from app.models.mascota_model import MascotaModel
from app.schemas.user import EditarPerfilRequest, UserCreate, UserResponse, UserLogin
from app.core.database import db
from app.core.security import hash_password, verify_password
from app.models.user_model import UserModel, user_dict
from app.core.jwt import create_access_token
from app.controllers.objetivo_controller import ObjetivoController

class UserController:
    
    @staticmethod
    async def register_user(data: UserCreate) -> UserResponse:

        existing_user = await db.users.find_one({"email": data.email})
        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="El correo electrónico ya está registrado."
            )
        
        # Convert UserCreate to dictionary to manipulate data
        data_dict = data.model_dump()

        # Hash the password before storing
        data_dict["password_hash"] = hash_password(data_dict["password"])
        del data_dict["password"]  # Remove plaintext password

        async with await db.client.start_session() as session:
            async with session.start_transaction():
                # Create user document
                user_document = UserModel.new_user(data_dict)
                # Insert user into the database
                await db.users.insert_one(user_document)

                data_dict["_id"] = user_document["_id"]

                # Create associated objetivo document
                await ObjetivoController.create_objetivo(data_dict)

                # Create associated plan document
                await PlanController.create_plan(data_dict)

                # Create associated despensa document
                await DespensaController.create_despensa(data_dict)

        # Return the created user response
        return UserResponse(**user_dict(user_document))


    @staticmethod
    async def login_user(email: str, password: str):

        """Authenticate user and return user data if valid."""
        user = await db.users.find_one({"email": email})
        if not user:
            raise HTTPException(
                status_code=400,
                detail="Correo electrónico o contraseña incorrectos."
            )
        
        if not verify_password(password, user["password_hash"]):
            raise HTTPException(
                status_code=400,
                detail="Correo electrónico o contraseña incorrectos."
            )
        
        """Generate JWT token upon successful login."""
        token_data = {

            "sub": str(user["_id"]),
            "email": user["email"]

        }

        """Create JWT access token."""
        token = create_access_token(token_data)

        return {"access_token": token, "token_type": "bearer"}
    

    @staticmethod
    async def update_tiene_plan(user_id: str, session=None):

        """Update the 'tiene_plan' field for a user."""
        await db.users.update_one(
            {"_id": user_id},
            {"$set": {"tiene_plan": True}},
            session=session
        )

    @staticmethod
    async def get_tiene_plan(user_id: ObjectId) -> dict:
        user = await db.users.find_one(
            {"_id": user_id},
            {"_id": 0, "tiene_plan": 1}
        )

        if not user:
            raise HTTPException(
                status_code=404,
                detail="Usuario no encontrado"
            )

        # Fallback defensivo
        return {
            "tiene_plan": bool(user.get("tiene_plan", False))
        }
    
    @staticmethod
    async def get_user_progress(current_user: dict):

        return {
            "numero_racha": current_user.get("dias_racha", 0),
            "cantidad_gemas": current_user.get("gemas_acumuladas", 0)
        }
    
    @staticmethod
    async def get_user_peso(current_user: dict):

        return {
            "peso_actual": current_user.get("peso_actual", 0.0)
        }
    
    @staticmethod
    async def update_user_peso(current_user: dict, nuevo_peso: float):
        user_id = ObjectId(current_user["_id"])

        try:

            await db.users.update_one(
                {"_id": user_id},
                {"$set": {"peso_actual": nuevo_peso,
                "ultima_actualizacion_peso": datetime.now(ZoneInfo("America/Bogota"))}}
            )
        
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail="Error al actualizar el peso del usuario"
            )

        return {"message": "Peso actualizado correctamente"}
    
    @staticmethod
    async def get_perfil_usuario(current_user: dict):

        user_id = ObjectId(current_user["_id"])

        user = await UserModel.get_usuario_por_id(user_id)

        mascotas_usuario = await MascotaModel.get_mascotas_usuario(user_id)

        mascota_activa = None

        if mascotas_usuario:

            tipo_activa = mascotas_usuario["mascota_activa"]

            mascota_activa = next(
                (m for m in mascotas_usuario["mascotas"] if m["tipo"] == tipo_activa),
                None
            )

        return {

            "nombre": user.get("nombre_completo"),
            "apodo": user.get("apodo"),
            "correo": user.get("email"),
            "genero": user.get("genero"),
            "edad": f"{int(UserModel.calcular_edad(user.get('fecha_nacimiento')))} años",
            "altura": f"{int(user.get('altura_cm'))} cm",
            "peso": f"{int(user.get('peso_actual'))} kg",

            "mascota": mascota_activa
        }
    
    @staticmethod
    async def editar_perfil(data: EditarPerfilRequest, current_user: dict):

        user_id = ObjectId(current_user["_id"])

        update_data = {}

        if data.nombre_usuario:
            update_data["nombre_completo"] = data.nombre_usuario

        if data.apodo_usuario:
            update_data["apodo"] = data.apodo_usuario

        if data.altura_usuario:
            update_data["altura_cm"] = data.altura_usuario

        mascotas_para_guardar = None

        if data.nombre_mascota:
            mascotas_usuario = await MascotaModel.get_mascotas_usuario(user_id)

            if not mascotas_usuario:
                raise HTTPException(status_code=404, detail="Mascota no encontrada")

            mascota_activa_tipo = mascotas_usuario["mascota_activa"]
            mascotas = mascotas_usuario["mascotas"]

            for mascota in mascotas:
                if mascota["tipo"] == mascota_activa_tipo:
                    mascota["nombre"] = data.nombre_mascota
                    break

            mascotas_para_guardar = mascotas

        # Si se requiere algún cambio (usuario o mascota), se ejecuta en transacción
        if mascotas_para_guardar is not None or update_data:
            try:
                session = await db.client.start_session()
                async with session:
                    async with session.start_transaction():
                        if mascotas_para_guardar is not None:
                            await MascotaModel.actualizar_nombre_mascota(
                                user_id,
                                mascotas_para_guardar,
                                session=session,
                            )
                        if update_data:
                            await UserModel.actualizar_usuario(
                                user_id,
                                update_data,
                                session=session,
                            )
            except Exception as e:
                raise HTTPException(
                    status_code=500,
                    detail="Error al editar el perfil del usuario"
                )

        try:
            perfil = await UserController.get_perfil_usuario(current_user)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail="Error al obtener el perfil del usuario"
            )

        return perfil