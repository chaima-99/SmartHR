from typing import Dict
from uuid import uuid4
from fastapi import HTTPException, Response
from sqlalchemy.orm import Session
from app import models, schemas
from passlib.context import CryptContext # type: ignore
import os

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
sessions: Dict[str, str] = {}
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def get_employe(db: Session):
    return db.query(models.Employe).all()

def get_RH(db: Session):
    return db.query(models.RessourceHumaine).all()

def get_tache(db: Session):
    return db.query(models.Tache).all()

def get_employe_tache(db: Session):
    return db.query(models.EmployeTache).all()

def get_historique(db: Session):
    return db.query(models.Historique).all()

def get_conge(db: Session):
    return db.query(models.Conge).all()

def get_abscence(db: Session):
    return db.query(models.Abscence).all()

def create_admin(db: Session, admin: schemas.Admin,response: Response):
    existing_admin = db.query(models.Admin).filter(models.Admin.username == admin.username).first()
    if existing_admin:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    admin = models.Admin(username=admin.username, password=hash_password(admin.password))
    db.add(admin)
    db.commit()
    db.refresh(admin)

    session_id = str(uuid4())
    sessions[session_id] = admin.id

    response.set_cookie(key="session_id", value=session_id)
    print(sessions[session_id])
    return admin

def create_employ(db: Session, employ: schemas.Employe):
    existing_employ = db.query(models.Employe).filter(models.Employe.UserName == employ.UserName).first()
    if existing_employ:
        raise HTTPException(status_code=400, detail="Employ already registered")
    employ = models.Employe(UserName=employ.UserName,
                            PassWord=hash_password(employ.PassWord),
                            Nom=employ.Nom,
                            DN=employ.DN,
                            Prenom =employ.Prenom,
                            Mail=employ.Mail,
                            Horaire=employ.Horaire,
                            Photo=employ.Photo)
    db.add(employ)
    db.commit()
    db.refresh(employ)

    return employ


def create_RH(db: Session, rh: schemas.RessourceHumaine):
    existing_rh = db.query(models.RessourceHumaine).filter(models.RessourceHumaine.UserName == rh.UserName).first()
    if existing_rh:
        raise HTTPException(status_code=400, detail="RH already registered")
    rh = models.RessourceHumaine(UserName=rh.UserName,
                                    PassWord=hash_password(rh.PassWord),
                                    NomRH=rh.NomRH,
                                    DNRH=rh.DNRH,
                                    PrenomRH =rh.PrenomRH,
                                    MailRH=rh.MailRH,
                                    photo=rh.photo)
    db.add(rh)
    db.commit()
    db.refresh(rh)

    return rh


