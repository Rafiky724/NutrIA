from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from app.core.jwt import decode_token
from app.core.database import db
from bson import ObjectId

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):

    payload = decode_token(token)

    if payload is None:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")

    user_id = payload.get("sub")
    email   = payload.get("email")

    if user_id is None or email is None:
        raise HTTPException(status_code=401, detail="Token inválido")

    # Search for the user in the database
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    return user
