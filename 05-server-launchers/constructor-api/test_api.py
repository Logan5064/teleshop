# Минимальный тест API
import uvicorn
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Constructor API Test", "port": 8001}

@app.post("/api/designs")
def create_design():
    return {"design_id": 1, "status": "created"}

if __name__ == "__main__":
    print("Starting test API on port 8001...")
    uvicorn.run(app, host="127.0.0.1", port=8001) 