from fastapi import HTTPException
from sqlalchemy.orm import Session
from app import models, schemas



def create_admin(db: Session, admin: schemas.Admin):
    existing_admin = db.query(models.Admin).filter(models.Admin.username == admin.username).first()
    if existing_admin:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    admin = models.Admin(username=admin.username, password=admin.password)
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin
