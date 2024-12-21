from typing import Dict, List
from urllib import response
from uuid import uuid4
from fastapi import FastAPI, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from app import models, schemas, crud
from app.database import engine, get_db
from fastapi.middleware.cors import CORSMiddleware


origins = [
    "http://localhost",  # Remplacez par l'URL de votre front-end, par exemple localhost si votre front-end est sur le même appareil
    "http://localhost:8008",  # Si vous utilisez un autre port pour le front-end (par exemple avec React)
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
sessions: Dict[str, str] = {}

@app.get("/")
def read_root():
    return {"message": "Welcome to your new API"}


@app.get("/emp", response_model=List[schemas.Employe])
def get_employe(db: Session = Depends(get_db)):
    return crud.get_employe(db=db)

@app.get("/RH", response_model=List[schemas.RessourceHumaine])
def get_RH(db: Session = Depends(get_db)):
    return crud.get_RH(db=db)

@app.get("/TACHE", response_model=List[schemas.Tache])
def get_tache(db: Session = Depends(get_db)):
    return crud.get_tache(db=db)

@app.get("/EMPLOYE-TACHE", response_model=List[schemas.EmployeTache])
def get_employe_tache(db: Session = Depends(get_db)):
    return crud.get_employe_tache(db=db)

@app.get("/HISTORIQUE", response_model=List[schemas.Historique])
def get_historique(db: Session = Depends(get_db)):
    return crud.get_historique(db=db)

@app.get("/CONGE", response_model=List[schemas.Conge])
def get_conge(db: Session = Depends(get_db)):
    return crud.get_conge(db=db)

@app.get("/ABSCENCE", response_model=List[schemas.Abscence])
def get_abscence(db: Session = Depends(get_db)):
    return crud.get_abscence(db=db)


@app.post("/a", response_model=schemas.Admin)
def create_admin(
    admin: schemas.Admin, 
    response: Response,  # Add this parameter
    db: Session = Depends(get_db)
):
    return crud.create_admin(db=db, admin=admin, response=response)

@app.post("/add_employe", response_model=schemas.Employe)
def create_employ(
    employ: schemas.Employe, 
    db: Session = Depends(get_db)
):
    return crud.create_employ(db=db, employ=employ)

@app.post("/add_RH", response_model=schemas.RessourceHumaine)
def create_RH(
    RH: schemas.RessourceHumaine, 
    db: Session = Depends(get_db)
):  
    return crud.create_RH(db=db, RH=RH)






