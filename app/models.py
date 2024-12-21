from sqlalchemy import Column, Date, Integer, String
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

    IDTache = Column(Integer, primary_key=True, index=True)
    NomTache = Column(String(100), nullable=False)