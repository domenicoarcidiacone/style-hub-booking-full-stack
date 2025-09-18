# Style Hub Backend (FastAPI + MongoDB)

## Setup

1. Create and activate a Python 3.11+ environment
2. Install dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Configure environment (create `backend/.env`):

```
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=stylehub
API_ORIGINS=http://localhost:5173
```

## Run

```bash
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints

- GET /api/health
- GET /api/specialists
- GET /api/services
- GET /api/favorites
- GET /api/appointments
- POST /api/appointments
