from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..db import get_db

router = APIRouter(tags=["debug"])

@router.get("/collections")
async def list_collections(db: AsyncIOMotorDatabase = Depends(get_db)):
    """Lista tutte le collezioni nel database"""
    collections = await db.list_collection_names()
    return {"collections": collections}

@router.get("/collection/{collection_name}")
async def inspect_collection(collection_name: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Ispeziona una collezione specifica"""
    collection = db[collection_name]
    
    # Conta i documenti
    count = await collection.count_documents({})
    
    # Prendi alcuni documenti di esempio
    sample_docs = []
    async for doc in collection.find({}).limit(5):
        # Converti ObjectId in stringa per la serializzazione JSON
        if "_id" in doc:
            doc["_id"] = str(doc["_id"])
        sample_docs.append(doc)
    
    return {
        "collection": collection_name,
        "document_count": count,
        "sample_documents": sample_docs
    }

@router.get("/database-info")
async def database_info(db: AsyncIOMotorDatabase = Depends(get_db)):
    """Informazioni generali sul database"""
    collections = await db.list_collection_names()
    
    info = {
        "database_name": db.name,
        "collections": []
    }
    
    for collection_name in collections:
        collection = db[collection_name]
        count = await collection.count_documents({})
        info["collections"].append({
            "name": collection_name,
            "document_count": count
        })
    
    return info