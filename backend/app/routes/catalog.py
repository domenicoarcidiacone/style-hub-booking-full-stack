from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..db import get_db

router = APIRouter(tags=["catalog"])

SPECIALISTS = [
    {"name": "Clay Burke", "available": True},
    {"name": "Eileen Rose", "available": True},
    {"name": "Hair Color", "available": False},
    {"name": "Cesar Wu", "available": True},
    {"name": "Simon R.", "available": True},
]

SERVICES = [
    {"name": "Taglio Classico", "price_eur": 25, "duration_min": 30, "rating": 4.9, "description": "Classico"},
    {"name": "Taglio + Barba", "price_eur": 35, "duration_min": 45, "rating": 4.9, "description": "Combinato"},
    {"name": "Barba", "price_eur": 15, "duration_min": 20, "rating": 4.8, "description": "Barba"},
]

@router.get("/specialists")
async def list_specialists(db: AsyncIOMotorDatabase = Depends(get_db)):
    count = await db["specialists"].count_documents({})
    if count == 0:
        await db["specialists"].insert_many(SPECIALISTS)
    items = []
    async for doc in db["specialists"].find({}):
        doc["id"] = str(doc.pop("_id"))
        items.append(doc)
    return {"items": items}

@router.get("/services")
async def list_services(db: AsyncIOMotorDatabase = Depends(get_db)):
    count = await db["services"].count_documents({})
    if count == 0:
        await db["services"].insert_many(SERVICES)
    items = []
    async for doc in db["services"].find({}):
        doc["id"] = str(doc.pop("_id"))
        items.append(doc)
    return {"items": items} 