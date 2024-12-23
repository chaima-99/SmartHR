from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional
from sqlmodel import Field, Session, SQLModel, create_engine, select

class ProductBase(SQLModel):
    name: str
    description: str | None = None
    price: float

class Product(ProductBase, table=True):
    __tablename__ = "products"
    id: int | None = Field(default=None, primary_key=True)
    created_at: datetime
        
class ProductPublic(ProductBase):
    id: int
    
class ProductCreate(ProductBase):
    pass

class UserBase(SQLModel):
    email: EmailStr
    full_name: str
    is_blocked: bool
    
class User(UserBase, table=True):
    __tablename__ = "users"
    id: int | None = Field(default=None, primary_key=True)
    pwd_hash: str

class UserPublic(UserBase):
    id: int

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    email: EmailStr | None = None
    full_name: str | None = None

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[str] = None
