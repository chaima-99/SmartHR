from typing import List
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

@app.post("/a", response_model=schemas.Admin)
def create_admin(admin: schemas.Admin, db: Session = Depends(get_db)):
    return crud.create_admin(db=db, admin=admin)

@app.get("/emp", response_model=List[schemas.Employe])
def get_employe(db: Session = Depends(get_db)):
    return crud.get_employe(db=db)

@app.get("/RH", response_model=List[schemas.RessourceHumaine])
def get_RH(db: Session = Depends(get_db)):
    return crud.get_RH(db=db)














