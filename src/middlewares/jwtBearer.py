from fastapi.security import HTTPBearer
from fastapi import Request, HTTPException
from models.userModel import User as UserModel
from config.db import Session
from utils.jwt import validateToken

class JWTBearer(HTTPBearer):
    async def __call__(self, request: Request):
        auth = await super().__call__(request)
        data = validateToken(auth.credentials)

        # Crear una nueva sesión de base de datos
        db = Session()

        # Buscar el usuario en la base de datos
        user = db.query(UserModel).filter(UserModel.email == data['email']).first()

        # Si no se encontró el usuario, lanzar una excepción
        if not user:
            raise HTTPException(status_code=401, detail="Invalid user")

        # Si se encontró el usuario, continuar con la solicitud
        return auth