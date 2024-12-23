from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import select
import app.database as database
from app.oauth2 import authenticate_user, create_access_token, get_current_user, hash_password
from app.schemas import User, UserCreate, UserPublic, UserUpdate
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def lifespan(app: FastAPI):
    database.create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

@app.post("/token")
async def login_for_access_token(session: database.SessionDep,form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password, session)  
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me")
async def read_users_me(current_user: Annotated[User, Depends(get_current_user)]):
    return current_user

@app.post("/users/", response_model=UserPublic)
def create_user(user: UserCreate, session: database.SessionDep):
    new_user = {
        "email": user.email,
        "full_name": user.full_name,
        "is_blocked": user.is_blocked,
        "pwd_hash": hash_password(user.password)
    }
    db_user = User.model_validate(new_user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

@app.get("/users/")
def read_users(
    token: Annotated[str, Depends(oauth2_scheme)],
    session: database.SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[UserPublic]:
    users = session.exec(select(User).offset(offset).limit(limit)).all()
    return users

@app.get("/users/{user_id}")
def read_user(user_id: int, session: database.SessionDep) -> User:
    hero = session.get(User, user_id)
    if not hero:
        raise HTTPException(status_code=404, detail="User not found")
    return hero

@app.patch("/users/{user_id}", response_model=UserPublic)
def update_user(user_id: int, user: UserUpdate, session: database.SessionDep):
    user_db = session.get(User, user_id)
    if not user_db:
        raise HTTPException(status_code=404, detail="Hero not found")
    user_data = user.model_dump(exclude_unset=True)
    user_db.sqlmodel_update(user_data)
    session.add(user_db)
    session.commit()
    session.refresh(user_db)
    return user_db
