from config.db import Base
from models.userModel import User
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship


class Task(Base):
    __tablename__ = 'tasks'
    
    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey('users.id'), nullable=False)  # Corrección aquí
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    done = Column(Boolean, default=False)
    
    user = relationship('User', back_populates="tasks")  
    # Definimos la relación uno a muchos con la tabla 'users' lo que significa que un usuario puede tener muchas tareas.
    
    def toDict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    # Definimos un método que nos permite convertir un objeto de la clase Task a un diccionario.