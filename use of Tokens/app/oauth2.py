from typing import Annotated
from datetime import datetime, timedelta
import bcrypt
from jose import JWTError, jwt
from sqlmodel import Session, select
from . import schemas
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
import app.database as database
from .config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

SECRET_KEY = settings.secret_key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def hash_password(password: str):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

async def authenticate_user(username: str, password: str, session: Session):
    user = session.exec(select(schemas.User).filter(schemas.User.email == username)).first()
    if user is None:
        return None
    if not bcrypt.checkpw(password.encode('utf-8'), user.pwd_hash.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Incorrect password")
    return user

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_token(token, session: Session):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Could not validate credentials")
        user = session.exec(select(schemas.User).filter(schemas.User.email == email)).first()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    return user

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], session: Session = Depends(database.get_session)):
    user = decode_token(token, session)
    return user