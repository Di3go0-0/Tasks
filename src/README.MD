# API de Tareas

El proyecto es un api de tareas en Python 3.12.2, en la api nos podemos registar, loguearnos y desloguearnos, podemos obtener un usuario por id, podemos eliminar un usuario por id, al momento de eliminar un usuario se eliminan las tareas que haya creado ese usuario.

Podemos crear tareas, obtener tarea por id, solo podemos acceder a las tareas que nosotros creamos, pasar las tareas de estado a completada, podemos filtrar tareas por tareas hechas y no hechas, tambien podemos eliminar una tarea por id y por ultimo podemos modificar las tareas.

## Instalación

1. Clona este repositorio en tu máquina local usando `git clone https://github.com/Di3go0-0/Python/tree/main/FastApi/task`.
2. Navega hasta el directorio del proyecto.
3. Crea un entorno virtual usando `python -m venv venv`.
4. Activa el entorno virtual:
   - En Windows: `venv\Scripts\activate`
   - En macOS y Linux: `source venv/bin/activate`
5. Instala las dependencias del proyecto usando `pip install -r requirements.txt`.

## Ejecución

Una vez instaladas las dependencias, puedes ejecutar el proyecto con el siguiente comando:
recuerda que el puerto lo puedes cambiar a tu gusto.

```bash
uvicorn main:app --reload --port 8000
