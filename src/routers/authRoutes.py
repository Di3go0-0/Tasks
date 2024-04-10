from fastapi import APIRouter, Depends, Response # Importamos la clase APIRouter para crear rutas
from utils.jwt import createToken # Importamos la función createToken del archivo jwt.py
from fastapi.responses import JSONResponse
from schemas.userSchema import User
from config.db import Session
from services.authServices import AuthService
# from middlewares.jwtBearer import JWTBearer
from middlewares.jwtBearer2 import JWTBearer2
from services.taskServices import TaskServices
from fastapi import HTTPException




router = APIRouter() # Creamos una instancia de la clase APIRouter

userLogueado = None


@router.post('/register', tags=['Auth'], response_model=dict, status_code=201)
def register(user: User) -> dict:
    try:
        if user.password != user.passwordConfirm :
            return JSONResponse(content={"message": "Passwords do not match"}, status_code=400) 
        AuthService(Session()).register(user)
        user_dict = user.dict()  # Convertimos el objeto User a un diccionario
        user_dict = AuthService(Session()).userByEmail(user.email)
        token = createToken(user_dict)

        response = JSONResponse(content=user_dict, status_code=201)
        # response.set_cookie(key="token", value=f"{token}", httponly=True, samesite="None", secure=True)
        return response
    except ValueError as e:
        print(e)  # Agregamos esta línea para imprimir la excepción
        if 'is already in use' in str(e):
            return JSONResponse(content={"message": "Email is already in use"}, status_code=409)
        return JSONResponse(content={"message": str(e)}, status_code=400)
    except Exception as e:
        print(e)  # Agregamos esta línea para imprimir la excepción
        return JSONResponse(content={"message": f"Registration failed: {str(e)}"}, status_code=400)
    
@router.post('/login', tags=['Auth'], response_model=dict, status_code=200)
def login(user: User) -> dict:
    result = AuthService(Session()).login(user.email, user.password)
    if result == "Not registered":  
        return JSONResponse(content={"message" : "Not registered"}, status_code=401)
    if result == "Incorrect password":
        return JSONResponse(content={"message":"Incorrect password"}, status_code=401)
    token = createToken(result)
    #response = JSONResponse(content={"message": "Login successful"}, status_code=200)
    response = JSONResponse(content=result, status_code=200)
    response.set_cookie(key="token", value=f"{token}", samesite="Strict", secure=False)
    return response


@router.post('/logout', tags=['Auth'], response_model=dict, status_code=200, dependencies = [Depends(JWTBearer2())])
def logout() -> dict:
    response = JSONResponse(content={"message": "Logout successful"}, status_code=200)
    response.delete_cookie(key="token")
    return response


@router.delete("/user/{id}", tags=['Auth'], response_model=dict )#, dependencies = [Depends(JWTBearer2())])
def deleteUser(id: int) -> dict:
    TaskServices(Session()).deleteAllTaskByUserId(id)
    result = AuthService(Session()).deleteUser(id)
    if not result:
        return JSONResponse(content={"message": "User not found"}, status_code=404)
    return JSONResponse(content={"message": "User deleted successfully"}, status_code=200)

@router.get('/verifyToken', tags=['Auth'], response_model=dict, status_code=200)
def VerifyToken(token: str = Depends(JWTBearer2())) -> dict:
    return JSONResponse(content={"message": "Token is valid"}, status_code=200)



