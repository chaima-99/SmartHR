from typing import Dict, Union
from urllib import request
from uuid import uuid4
from fastapi import HTTPException, Request, Response
from sqlalchemy.orm import Session
from app import models, schemas
from passlib.context import CryptContext # type: ignore

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
sessions = {}

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

def login(db: Session, username: str, password: str, response: Response):
    try:
        # Check Admin table
        admin =db.query(models.Admin).filter(models.Admin.username == username).first()
        if admin and pwd_context.verify(password, admin.password):
            session_id = str(uuid4())
            sessions[session_id] = {"id": admin.id, "role": "admin"}
            response.set_cookie(key="session_id", value=session_id)
            return {"user": admin, "role": "admin"}

        # Check Employe table
        employe = db.query(models.Employe).filter(models.Employe.UserName == username).first()
        if employe and pwd_context.verify(password, employe.PassWord):
            session_id = str(uuid4())
            sessions[session_id] = {"id": employe.id, "role": "employe"}
            response.set_cookie(key="session_id", value=session_id)
            return {"user": employe, "role": "employe"}

        # Check RessourceHumaine table
        rh = db.query(models.RessourceHumaine).filter(models.RessourceHumaine.UserName == username).first()
        if rh and pwd_context.verify(password, rh.PassWord):
            session_id = str(uuid4())
            sessions[session_id] = {"id": rh.id, "role": "rh"}
            response.set_cookie(key="session_id", value=session_id)
            return {"user": rh, "role": "rh"}

        raise HTTPException(status_code=400, detail="Incorrect username or password")

    except Exception as e:
        print(f"Erreur interne : {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

def update_employe(db: Session, employe_user: str, employ: schemas.Employe):
    existing_employ = db.query(models.Employe).filter(models.Employe.UserName == employe_user).first()
    if not existing_employ:
        raise HTTPException(status_code=400, detail="Employ not found")
    db.query(models.Employe).filter(models.Employe.UserName == employe_user).update({
        "UserName": employ.UserName,
        "PassWord": hash_password(employ.PassWord),
        "Nom": employ.Nom,
        "DN": employ.DN,
        "Prenom": employ.Prenom,
        "Mail": employ.Mail,
        "Horaire": employ.Horaire,
        "Photo": employ.Photo
    })
    db.commit()
    return {"message": "Employ updated successfully"}

def get_employee_profile(db: Session, username: str, request: Request):
    session_id = request.cookies.get("session_id")
    session = sessions.get(session_id)
    
    employe = db.query(models.Employe).filter(models.Employe.UserName == username).first()
    
    if not employe:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    if not (employe.id == session["id"] and session["role"] == "employe"):
        raise HTTPException(status_code=400, detail="Employee not found")
    
    return employe

def check_employee_history(db: Session, username: str, request: Request):
    employe = db.query(models.Employe).filter(models.Employe.UserName == username).first()
    session_id = request.cookies.get("session_id")
    session = sessions.get(session_id)

    if not employe:
        raise HTTPException(status_code=404, detail="Employe not found")
    
    if not (employe.id == session["id"] and session["role"] == "employe"):
        raise HTTPException(status_code=400, detail="Employe not found")
    try:
        historiques= db.query(models.Historique).filter(models.Historique.IDEmploye == employe.id).all()
        return historiques
    except Exception as e:
        print(f"Erreur interne : {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")
    
def get_employee_tasks(db: Session, username: str, request: Request):
    employe = db.query(models.Employe).filter(models.Employe.UserName == username).first()
    session_id = request.cookies.get("session_id")
    session = sessions.get(session_id)

    if not employe:
        raise HTTPException(status_code=404, detail="Employe not found")
    
    if not (employe.id == session["id"] and session["role"] == "employe"):
        raise HTTPException(status_code=400, detail="Employe not found")
    try:
        taches = db.query(models.EmployeTache).filter(models.EmployeTache.IDEmploye == employe.id).all()
        return taches
    except Exception as e:
        print(f"Erreur interne : {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")
