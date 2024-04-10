from fastapi import FastAPI
from routers.authRoutes import router as authRouter
from routers.taskRoutes import router as taskRouter
from config.db import engine, Base
from middlewares.errorHandler import ErrorHandler
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


# Instanciamos FastAPI
app = FastAPI()

# Renombramos la documentacion
app.title = "Task"
app.version = "1.0.2"
app.description = "API proyecto final Backend-fastapi"

app.add_middleware(ErrorHandler) # Agregamos el middleware de manejo de errores
app.include_router(authRouter) # Agregamos las rutas de auth
app.include_router(taskRouter) # Agregamos las rutas de task
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],  # Origenes permitidos 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine) # Creamos las tablas en la base de datos

@app.get('/', tags=['Home']) # Definimos la ruta de inicio
def message():
    return {"message": "Bienvenido a mi API"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
