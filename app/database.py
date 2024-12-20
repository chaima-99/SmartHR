from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# URL de la base de données MySQL
DATABASE_URL = "mysql+pymysql://root:islam@localhost/hotel"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dépendance pour obtenir la session de base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
