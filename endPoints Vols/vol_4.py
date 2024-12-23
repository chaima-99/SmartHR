from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel, validator
from typing import List, Optional
from datetime import datetime, date
from enum import Enum
from fastapi.security import OAuth2PasswordBearer

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Énumération pour le statut des demandes
class LeaveStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

# Énumération pour le type de congé
class LeaveType(str, Enum):
    PAID = "paid"
    UNPAID = "unpaid"
    SICK = "sick"
    VACATION = "vacation"

# Modèles Pydantic
class LeaveRequest(BaseModel):
    start_date: date
    end_date: date
    leave_type: LeaveType
    reason: Optional[str] = None

    @validator('end_date')
    def end_date_must_be_after_start_date(cls, v, values):
        if 'start_date' in values and v < values['start_date']:
            raise ValueError('end_date must be after start_date')
        return v

class LeaveResponse(LeaveRequest):
    id: int
    employee_id: int
    status: LeaveStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class LeaveStatusUpdate(BaseModel):
    status: LeaveStatus
    comment: Optional[str] = None

# Endpoints RH
@app.get("/hr/leaves", response_model=List[LeaveResponse], tags=["hr"])
async def get_all_leave_requests(
    status: Optional[LeaveStatus] = None,
    token: str = Depends(oauth2_scheme)
):
    """Récupération de toutes les demandes de congés"""
    return []

@app.put("/hr/leaves/{leave_id}", response_model=LeaveResponse, tags=["hr"])
async def update_leave_status(
    leave_id: int,
    status_update: LeaveStatusUpdate,
    token: str = Depends(oauth2_scheme)
):
    """Validation ou refus d'une demande de congés"""
    return {
        "id": leave_id,
        "employee_id": 1,
        "start_date": date.today(),
        "end_date": date.today(),
        "leave_type": LeaveType.PAID,
        "status": status_update.status,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }

# Endpoints Employés
@app.post("/employee/leaves", response_model=LeaveResponse, tags=["employee"])
async def create_leave_request(
    leave_request: LeaveRequest,
    token: str = Depends(oauth2_scheme)
):
    """Création d'une demande de congés"""
    return {
        "id": 1,
        "employee_id": 1,
        "status": LeaveStatus.PENDING,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
        **leave_request.dict()
    }

@app.get("/employee/leaves", response_model=List[LeaveResponse], tags=["employee"])
async def get_my_leave_requests(
    status: Optional[LeaveStatus] = None,
    token: str = Depends(oauth2_scheme)
):
    """Consultation des demandes de congés de l'employé"""
    return []

@app.get("/employee/leaves/balance", tags=["employee"])
async def get_leave_balance(token: str = Depends(oauth2_scheme)):
    """Consultation du solde de congés"""
    return {
        "paid_leave_balance": 25,
        "sick_leave_balance": 12,
        "used_paid_leave": 5,
        "used_sick_leave": 2
    }