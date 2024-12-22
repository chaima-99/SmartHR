from sqlalchemy import Column, Date, Enum, ForeignKey, Integer, SmallInteger, String, Time
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
    UserName = Column(String(50), unique=True)
    PassWord = Column(String(255))
    Nom = Column(String(100))
    Prenom = Column(String(100))
    DN = Column(Date, nullable=False)
    Mail = Column(String(100),nullable=False)
    Horaire = Column(String(50), nullable=True)
    Photo = Column(String(255), nullable=True)

class RessourceHumaine(Base):
    __tablename__ = "ressource_humaine"

    id = Column(Integer, primary_key=True, autoincrement=True)
    UserName = Column(String(50), unique=True, nullable=False)
    PassWord = Column(String(255), nullable=False)
    NomRH = Column(String(100), nullable=False)
    PrenomRH = Column(String(100), nullable=False)
    DNRH = Column(Date, nullable=False)
    MailRH = Column(String(100), unique=True, nullable=False)
    photo = Column(String(255), nullable=True)

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
    __tablename__ = "Historique"

    IDHistorique = Column(Integer, primary_key=True, autoincrement=True)
    JourDeSemaine = Column(SmallInteger, nullable=False)
    Mois = Column(SmallInteger, nullable=False)
    Heure = Column(Time, nullable=False)
    EventName = Column(Enum('CheckIn', 'CheckOut', name='event_name_enum'), nullable=False)
    IDEmploye = Column(Integer, ForeignKey("Employe.IDEmploye"), nullable=False)

class Conge(Base):
    __tablename__ = "conge"

    IdConge = Column(Integer, primary_key=True, index=True, autoincrement=True)
    DateDebut = Column(Date, nullable=False)
    DateFin = Column(Date, nullable=False)
    Motif = Column(String(255), nullable=False)
    EtatConge = Column(String(255), nullable=False)
    PhotoMotif = Column(String(255), nullable=True)
    IDEmploye = Column(Integer, ForeignKey("employe.id"), nullable=False)

class Abscence(Base):
    __tablename__ = "abscence"

    IDAbscence = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Mois = Column(Integer, nullable=False)
    Jour = Column(Integer, nullable=False)
    IDEmploye = Column(Integer, ForeignKey("employe.id", ondelete="CASCADE"), nullable=False)
