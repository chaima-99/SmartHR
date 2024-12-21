from datetime import date, time
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class Admin(BaseModel):
    id: int
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

# Schéma de base pour l'entrée des données des RH:
class Ressource_Humaine(BaseModel):
    id: int
    UserName: str
    PassWord: str
    NomRH: str
    PrenomRH: str
    DNRH: date
    MailRH: EmailStr
    photo: Optional[str] = None

# Schéma pour la lecture des tâches
class Tache(BaseModel):
    IDTache: int
    NomTache: str

class EmployeTache(BaseModel):
    IDEmploye: int
    IDTache: int
    EtatTache: str

class Historique(BaseModel):
    IDHistorique: int
    Date: date
    Heure: time
    EventName: str
    IDEmploye: int

class Conge(BaseModel):
    IdConge: int
    DateDebut: date
    DateFin: date
    Motif: Optional[str] = None
    EtatConge: Optional[str] = None
    PhotoMotif: Optional[str] = None
    IDEmploye: int

class Abscence(BaseModel):
    IDAbscence: int
    Mois: int = Field(..., ge=1, le=12, description="Month of the absence (1-12)")
    Jour: int = Field(..., ge=1, le=31, description="Day of the absence (1-31)")
    IDEmploye: int
