from typing import Optional, List
from pydantic import BaseModel, Field

class Specialist(BaseModel):
    id: Optional[str] = Field(default=None)
    name: str
    available: bool = True

class Service(BaseModel):
    id: Optional[str] = Field(default=None)
    name: str
    price_eur: float
    duration_min: int
    rating: float = 4.9
    description: Optional[str] = None

class FavoriteService(BaseModel):
    id: Optional[str] = Field(default=None)
    user_id: str
    service_id: str
    last_booked_human: Optional[str] = None

class Appointment(BaseModel):
    id: Optional[str] = Field(default=None)
    user_id: str
    specialist_id: str
    service_id: str
    date_iso: str
    time_label: str 