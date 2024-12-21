from fastapi import FastAPI, HTTPException, Depends, Query
from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime, date
from fastapi.security import OAuth2PasswordBearer
from enum import Enum

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Modèles Pydantic
class TimeRange(str, Enum):
    DAY = "day"
    WEEK = "week"
    MONTH = "month"
    YEAR = "year"

class GlobalStats(BaseModel):
    total_employees: int
    present_today: int
    absent_today: int
    late_today: int
    average_presence_rate: float
    average_punctuality_rate: float

class DepartmentStats(BaseModel):
    department_name: str
    absence_rate: float
    lateness_rate: float
    employees_count: int

class TimePrediction(BaseModel):
    date: date
    predicted_absences: int
    predicted_lates: int
    confidence_score: float

class TrendAnalysis(BaseModel):
    trend: str  # "increasing", "decreasing", "stable"
    change_percentage: float
    contributing_factors: List[str]

# Endpoints pour les statistiques
@app.get("/hr/dashboard/stats/global", response_model=GlobalStats, tags=["dashboard"])
async def get_global_statistics(
    time_range: TimeRange = TimeRange.MONTH,
    token: str = Depends(oauth2_scheme)
):
    """
    Statistiques globales sur les présences, absences et retards
    """
    return {
        "total_employees": 150,
        "present_today": 130,
        "absent_today": 15,
        "late_today": 5,
        "average_presence_rate": 92.5,
        "average_punctuality_rate": 95.0
    }

@app.get("/hr/dashboard/stats/departments", response_model=List[DepartmentStats], tags=["dashboard"])
async def get_department_statistics(
    time_range: TimeRange = TimeRange.MONTH,
    token: str = Depends(oauth2_scheme)
):
    """
    Statistiques par département
    """
    return [
        {
            "department_name": "IT",
            "absence_rate": 5.2,
            "lateness_rate": 3.1,
            "employees_count": 45
        }
    ]

@app.get("/hr/dashboard/trends", tags=["dashboard"])
async def get_attendance_trends(
    time_range: TimeRange = TimeRange.MONTH,
    token: str = Depends(oauth2_scheme)
):
    """
    Analyse des tendances d'absentéisme et de retards
    """
    return {
        "absence_trend": {
            "trend": "decreasing",
            "change_percentage": -2.5,
            "contributing_factors": ["seasonal_effect", "workplace_improvements"]
        },
        "lateness_trend": {
            "trend": "stable",
            "change_percentage": 0.1,
            "contributing_factors": ["traffic_conditions"]
        }
    }

# Endpoints pour les prédictions
@app.get("/hr/predictions/absences", response_model=List[TimePrediction], tags=["predictions"])
async def get_absence_predictions(
    start_date: date,
    end_date: date,
    department: Optional[str] = None,
    token: str = Depends(oauth2_scheme)
):
    """
    Prédictions d'absentéisme basées sur les séries temporelles
    """
    return [
        {
            "date": start_date,
            "predicted_absences": 12,
            "predicted_lates": 4,
            "confidence_score": 0.85
        }
    ]

@app.get("/hr/predictions/factors", tags=["predictions"])
async def get_prediction_factors(token: str = Depends(oauth2_scheme)):
    """
    Facteurs influençant les prédictions
    """
    return {
        "primary_factors": [
            {
                "name": "seasonal_patterns",
                "impact_score": 0.8,
                "description": "Variations saisonnières"
            },
            {
                "name": "weather_conditions",
                "impact_score": 0.6,
                "description": "Conditions météorologiques"
            }
        ],
        "historical_correlation": {
            "weather_impact": 0.7,
            "day_of_week_impact": 0.5,
            "seasonal_impact": 0.8
        }
    }