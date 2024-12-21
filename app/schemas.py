from datetime import date
from typing import Optional
from pydantic import BaseModel, EmailStr


class Admin(BaseModel):
    username: str
    password: str

class Employe(BaseModel):
    id: int
    UserName: str
    Nom: str
    Prenom: str
    DN: date
    Mail: EmailStr
    Horaire: Optional[str] = None
    Photo: Optional[str] = None
    PassWord: str
