from config.db import Base
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True) # Definimos el campo 'id' como clave primaria.
    email = Column(String, nullable=False) # Definimos el campo 'email' como no nulo.
    password = Column(String, nullable=False) # Definimos el campo 'password' como no nulo.
    
    tasks = relationship("Task", back_populates="user") # Definimos la relación uno a muchos con la tabla 'tasks'.
    
    
    
    def toDict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    # Definimos un método que nos permite convertir un objeto de la clase User a un diccionario.