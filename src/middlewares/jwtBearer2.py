from fastapi import Request, HTTPException, Cookie
from models.userModel import User as UserModel
from config.db import Session
from utils.jwt import validateToken
from fastapi.security import HTTPBearer

class JWTBearer2(HTTPBearer):
    async def __call__(self, request: Request):
        token = request.cookies.get('token')
        if not token:
            raise HTTPException(status_code=401, detail="No token in cookies")

        data = validateToken(token)
        if not data:
            raise HTTPException(status_code=401, detail="Invalid token")

        db = Session()
        user = db.query(UserModel).filter(UserModel.email == data['email']).first()

        if not user:
            raise HTTPException(status_code=401, detail="Invalid user")

        return token