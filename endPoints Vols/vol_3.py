from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from enum import Enum
from fastapi.security import OAuth2PasswordBearer

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Énumération pour le statut des tâches
class TaskStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"

# Modèles Pydantic
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None

class TaskCreate(TaskBase):
    employee_id: int

class TaskUpdate(BaseModel):
    status: TaskStatus

class Task(TaskBase):
    id: int
    employee_id: int
    status: TaskStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# Endpoints RH
@app.post("/hr/tasks", response_model=Task, tags=["hr"])
async def create_task(task: TaskCreate, token: str = Depends(oauth2_scheme)):
    """Attribution d'une tâche à un employé"""
    return {
        "id": 1,
        "status": TaskStatus.PENDING,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
        **task.dict()
    }

@app.get("/hr/tasks", response_model=List[Task], tags=["hr"])
async def get_all_tasks(
    status: Optional[TaskStatus] = None,
    token: str = Depends(oauth2_scheme)
):
    """Visualisation de toutes les tâches et leur statut"""
    return []

@app.get("/hr/tasks/employee/{employee_id}", response_model=List[Task], tags=["hr"])
async def get_employee_tasks(
    employee_id: int,
    status: Optional[TaskStatus] = None,
    token: str = Depends(oauth2_scheme)
):
    """Visualisation des tâches d'un employé spécifique"""
    return []

# Endpoints Employés
@app.get("/employee/tasks", response_model=List[Task], tags=["employee"])
async def get_my_tasks(
    status: Optional[TaskStatus] = None,
    token: str = Depends(oauth2_scheme)
):
    """Visualisation des tâches assignées à l'employé connecté"""
    return []

@app.put("/employee/tasks/{task_id}", response_model=Task, tags=["employee"])
async def update_task_status(
    task_id: int,
    task_update: TaskUpdate,
    token: str = Depends(oauth2_scheme)
):
    """Mise à jour du statut d'une tâche par l'employé"""
    return {
        "id": task_id,
        "status": task_update.status,
        "title": "Example Task",
        "employee_id": 1,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }

@app.get("/employee/tasks/statistics", tags=["employee"])
async def get_task_statistics(token: str = Depends(oauth2_scheme)):
    """Statistiques des tâches de l'employé"""
    return {
        "total_tasks": 0,
        "completed_tasks": 0,
        "pending_tasks": 0,
        "completion_rate": 0.0
    }