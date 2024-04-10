import os # Importamos el módulo 'os' para trabajar con rutas de archivos.
from sqlalchemy import create_engine # Importamos para crear un 'engine' de SQLAlchemy.
from sqlalchemy.orm.session import sessionmaker # Importamos para crear una fábrica de sesiones.
from sqlalchemy.ext.declarative import declarative_base # Importamos para crear la clase base de los modelos.

# Nombre del archivo de la base de datos SQLite.
sqliteFileName = "../database.sqlite" 

# Obtenemos la ruta absoluta del directorio actual.
baseDir = os.path.dirname(os.path.realpath(__file__)) 

# Construimos la ruta absoluta al archivo de la base de datos.
pathFileDB = os.path.join(baseDir, sqliteFileName)

# Creamos la cadena de conexión a la base de datos SQLite.
databaseURL = f"sqlite:///{pathFileDB}"

# Creamos un punto de entrada a la base de datos.
engine = create_engine(databaseURL, echo=False)

# Creamos una fábrica de sesiones de SQLAlchemy.
Session = sessionmaker(bind=engine)

# Creamos la clase base para los modelos de SQLAlchemy.
Base = declarative_base() # Creamos la clase base para los modelos de SQLAlchemy.