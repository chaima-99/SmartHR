from datetime import date, time
from typing import Optional
from pydantic import BaseModel, EmailStr


class Admin(BaseModel):
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
class RessourceHumaine(BaseModel):
    id: int
    UserName: str
    PassWord: str
    NomRH: str
    PrenomRH: str
    DNRH: date
    MailRH: EmailStr

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

