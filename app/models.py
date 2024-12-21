from sqlalchemy import Column, Date, ForeignKey, Integer, String, Time
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Admin(Base):
    __tablename__ = "admin"
    
    id = Column(Integer, primary_key=True)
    username = Column(String(100))
    password = Column(String(100))

class Employe(Base):
    __tablename__ = "employe"

    id = Column(Integer, primary_key=True)
    UserName = Column(String(50), unique=True, nullable=False)
    PassWord = Column(String(255), nullable=False)
    Nom = Column(String(100), nullable=False)
    Prenom = Column(String(100), nullable=False)
    DN = Column(Date, nullable=False)
    Mail = Column(String(100), unique=True, nullable=False)
    Horaire = Column(String(50), nullable=True)
    Photo = Column(String(255), nullable=True)

class RessourceHumaine(Base):
    __tablename__ = "ressourcehumaine"

    id = Column(Integer, primary_key=True)
    UserName = Column(String(50), unique=True, nullable=False)
    PassWord = Column(String(255), nullable=False)
    NomRH = Column(String(100), nullable=False)
    PrenomRH = Column(String(100), nullable=False)
    DNRH = Column(Date, nullable=False)
    MailRH = Column(String(100), unique=True, nullable=False)

class Tache(Base):
    __tablename__ = "tache"

    IDTache = Column(Integer, primary_key=True)
    NomTache = Column(String(100), nullable=False)

class EmployeTache(Base):
    __tablename__ = "employe_tache"

    IDEmploye = Column(Integer, ForeignKey("employe.id"), primary_key=True)
    IDTache = Column(Integer, ForeignKey("tache.IDTache"), primary_key=True)
    EtatTache = Column(String(50), nullable=False)

class Historique(Base):
    __tablename__ = "historique"

    IDHistorique = Column(Integer, primary_key=True, autoincrement=True)
    Date = Column(Date, nullable=False)
    Heure = Column(Time, nullable=False)
    EventName = Column(String(50), nullable=False)  # Changement de ENUM à VARCHAR(50)
    IDEmploye = Column(Integer, ForeignKey("employe.id"), nullable=False)