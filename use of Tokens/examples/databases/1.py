from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select
from app.schemas import User, UserCreate, UserPublic, UserUpdate
from .config import settings

postgres_url = f"postgresql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}"
engine = create_engine(postgres_url)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    
def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

@app.post("/users/", response_model=UserPublic)
def create_user(user: UserCreate, session: SessionDep):
    new_user = {
        "email": user.email,
        "full_name": user.full_name,
        "is_blocked": user.is_blocked,
        "pwd_hash": user.password
    }
    db_user = User.model_validate(new_user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

@app.get("/users/")
def read_users(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[UserPublic]:
    heroes = session.exec(select(User).offset(offset).limit(limit)).all()
    return heroes

@app.get("/users/{user_id}")
def read_user(user_id: int, session: SessionDep) -> User:
    hero = session.get(User, user_id)
    if not hero:
        raise HTTPException(status_code=404, detail="User not found")
    return hero

@app.patch("/users/{user_id}", response_model=UserPublic)
def update_user(user_id: int, user: UserUpdate, session: SessionDep):
    user_db = session.get(User, user_id)
    if not user_db:
        raise HTTPException(status_code=404, detail="Hero not found")
    user_data = user.model_dump(exclude_unset=True)
    user_db.sqlmodel_update(user_data)
    session.add(user_db)
    session.commit()
    session.refresh(user_db)
    return user_db
