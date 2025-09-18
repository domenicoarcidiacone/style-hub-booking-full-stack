from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..db import get_db
from bson import ObjectId

router = APIRouter(tags=["user"])

DEFAULT_USER_ID = "demo-user"

@router.get("/favorites")
async def get_favorites(db: AsyncIOMotorDatabase = Depends(get_db)):
    # join with services for display
    svc_map = {}
    async for svc in db["services"].find({}):
        svc_map[str(svc["_id"])] = svc
    items = []
    async for fav in db["favorites"].find({"user_id": DEFAULT_USER_ID}):
        svc = svc_map.get(fav.get("service_id"))
        if svc:
            item = {
                "id": str(fav["_id"]),
                "name": svc["name"],
                "price": f"€{svc['price_eur']}",
                "duration": f"{svc['duration_min']} min",
                "rating": svc.get("rating", 4.9),
                "description": svc.get("description"),
                "lastBooked": fav.get("last_booked_human", "-"),
            }
            items.append(item)
    if not items:
        # seed a few favorites based on services
        async for svc in db["services"].find({}).limit(3):
            await db["favorites"].insert_one({
                "user_id": DEFAULT_USER_ID,
                "service_id": str(svc["_id"]),
                "last_booked_human": "2 settimane fa",
            })
        return await get_favorites(db)
    return {"items": items}

@router.get("/appointments")
async def list_appointments(db: AsyncIOMotorDatabase = Depends(get_db)):
    items = []
    async for appt in db["appointments"].find({"user_id": DEFAULT_USER_ID}):
        appt["id"] = str(appt.pop("_id"))
        items.append(appt)
    return {"items": items}

@router.post("/appointments")
async def create_appointment(payload: dict, db: AsyncIOMotorDatabase = Depends(get_db)):
    payload["user_id"] = DEFAULT_USER_ID
    res = await db["appointments"].insert_one(payload)
    payload["id"] = str(res.inserted_id)
    return payload 