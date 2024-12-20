from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, crud
from app.database import engine, get_db
from fastapi.middleware.cors import CORSMiddleware


origins = [
    "http://localhost",  # Remplacez par l'URL de votre front-end, par exemple localhost si votre front-end est sur le même appareil
    "http://localhost:8001",  # Si vous utilisez un autre port pour le front-end (par exemple avec React)
    "http://127.0.0.1",  # Si vous utilisez l'IP locale

    "http://127.0.0.1:5500",  # URL de votre page HTML si elle est servie sur ce port
    "http://localhost:8001",  # Optionnel si localhost est utilisé au lieu de 127.0.0.1
]


# Créer les tables dans la base de données
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Autoriser toutes les origines (remplacez par votre domaine pour plus de sécurité)
    allow_credentials=True,
    allow_methods=["*"],  # Permet toutes les méthodes HTTP
    allow_headers=["*"],  # Permet tous les en-têtes

)

@app.get("/")
def read_root():
    return {"message": "Welcome to your new API"}

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    # La gestion des erreurs est maintenant dans la fonction CRUD
    db_user = crud.get_user(db, user_id=user_id)
    return db_user
