from pydantic import BaseModel

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    name: str
    email: str

class User(UserBase):
    id: int

