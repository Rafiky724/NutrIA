from fastapi import HTTPException
from app.schemas.user import UserCreate, UserResponse, UserLogin
from app.core.database import db
from app.core.security import hash_password, verify_password
from app.models.user_model import UserModel, user_dict
from app.core.jwt import create_access_token

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

        # Create user document
        user_document = UserModel.new_user(data_dict)

        # Insert user into the database
        await db.users.insert_one(user_document)

        # Return the created user response
        return UserResponse(**user_dict(user_document))


    @staticmethod
    async def login_user(data: UserLogin):

        """Authenticate user and return user data if valid."""
        user = await db.users.find_one({"email": data.email})
        if not user:
            raise HTTPException(
                status_code=400,
                detail="Correo electrónico o contraseña incorrectos."
            )
        
        if not verify_password(data.password, user["password_hash"]):
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
