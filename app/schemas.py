from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(BaseModel):
    name: str
    email: EmailStr 

class User(UserBase):
    id: int

