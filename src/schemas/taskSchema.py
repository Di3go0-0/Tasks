from pydantic import BaseModel, Field
# pydantic es una librería que permite definir esquemas de datos en Python.
# BaseModel es una clase de pydantic que nos permite definir un esquema de datos.
# Field es una clase de pydantic que nos permite definir un campo de un esquema de datos.
from typing import Optional
# typing es un módulo que nos permite definir tipos de datos en Python.
# Optional es un tipo de dato que nos permite definir que un campo puede ser nulo.


class Task(BaseModel):
    id: Optional[int] = None
    userId :Optional[int] = None
    title : str = Field(min_length=3, max_length=20)
    description : str = Field(min_length=3, max_length=100)
    done : Optional[bool] = False  
    
    # Configuracion de la documentacion
    class Config:
        model_config = {
            "json_schema_extra": {
                "examples": [
                    {
                        "userId": 1,
                        "title": "Tarea 1",
                        "description": "Descripcion de la tarea 1",
                        "done": False
                    }
                ]
            }
        }
    