from models.userModel import User as UserModel
from schemas.userSchema import User
from fastapi.responses import JSONResponse
import bcrypt

class AuthService():
    def __init__(self, db) -> None:
        self.db = db

    
    def register(self, user:User): 
        # Comprobar si el correo electrónico ya está en uso
        existingUser = self.db.query(UserModel).filter_by(email=user.email).first()
        if existingUser is not None:
            raise ValueError(f"Email {user.email} is already in use")

        if hasattr(user, 'passwordConfirm'):
            delattr(user, 'passwordConfirm')
        # Si el correo electrónico no está en uso, registrar al nuevo usuario
        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
        
        user.password = hashed_password.decode('utf-8')  # Guardar la contraseña hasheada en el modelo
        new_user = UserModel(**user.model_dump())
        self.db.add(new_user)
        self.db.commit()

    def toDict(self):
        return {
            # otros campos aquí
            "id": self.id,
            "email": self.email,
            # no incluir la contraseña
        }
        
    def userByEmail(self, email:str):
        user = self.db.query(UserModel).filter(UserModel.email == email).first()
        return user.toDict() if user else None
               
    def login (self, email:str, password:str):
        user = self.db.query(UserModel).filter(UserModel.email == email).first()
        if not user:
            return "Not registered"
        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return "Incorrect password"
        return user.toDict()
    
    def logout (self, token: str):
        pass
    
    def getUser(self, id:int):
        result = self.db.query(UserModel).filter(UserModel.id == id).first()
        return result
    
    def deleteUser(self, id:int):
        user = self.db.query(UserModel).filter(UserModel.id == id).first()
        if user is None:
            return None
        self.db.delete(user)
        self.db.commit()
        return True
    

        
               
               


