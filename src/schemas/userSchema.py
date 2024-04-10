from pydantic import BaseModel, Field, EmailStr
# pydantic es una librería que permite definir esquemas de datos en Python.
# BaseModel es una clase de pydantic que nos permite definir un esquema de datos.
# Field es una clase de pydantic que nos permite definir un campo de un esquema de datos.
# EmailStr es una clase de pydantic que nos permite definir un campo de tipo email.
from typing import Optional
# typing es un módulo que nos permite definir tipos de datos en Python.
# Optional es un tipo de dato que nos permite definir que un campo puede ser nulo.
class User(BaseModel):
    id: Optional[int] = None
    email: EmailStr
    password: str = Field(min_length=4, max_length=100)
    passwordConfirm: Optional[str] = Field(None, min_length=4, max_length=100)
    
    # Configuracion de la documentacion
    class Config:
        model_config = {
            "json_schema_extra": {
                "examples": [
                    {
                        "email": "user@gmail.com",
                        "password": "1234",
                        "passwordConfirm": "1234"
                    }
                ]
            }
        }