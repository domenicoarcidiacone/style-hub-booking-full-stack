from typing import Optional
import os
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

_mongo_client: Optional[AsyncIOMotorClient] = None
_db: Optional[AsyncIOMotorDatabase] = None

async def get_db() -> AsyncIOMotorDatabase:
    global _mongo_client, _db
    if _db is None:
        mongodb_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
        mongodb_db = os.getenv("MONGODB_DB", "stylehub")
        _mongo_client = AsyncIOMotorClient(mongodb_uri)
        _db = _mongo_client[mongodb_db]
    return _db 