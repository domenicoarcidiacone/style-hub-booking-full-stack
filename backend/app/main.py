from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.health import router as health_router
from .routes.catalog import router as catalog_router
from .routes.user import router as user_router
from .routes.debug import router as debug_router

app = FastAPI(title="Style Hub API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api")
app.include_router(catalog_router, prefix="/api")
app.include_router(user_router, prefix="/api")
app.include_router(debug_router, prefix="/api/debug")