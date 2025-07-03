from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from datetime import datetime
from database import init_database

app = FastAPI(title="TeleShop Constructor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"service": "TeleShop Constructor API", "version": "2.0.0", "database": "PostgreSQL"}

@app.get("/health")
def health():
    return {"status": "healthy", "database": "postgresql"}

@app.get("/designs")
def get_designs():
    return []

@app.get("/shops")  
def get_shops():
    return []

@app.get("/templates")
def get_templates():
    return []

@app.on_event("startup")
async def startup():
    print("🎨 Constructor API запущен")
    if init_database():
        print("✅ PostgreSQL подключен")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001) 