from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import uuid

from models import Case, Evidence

app = FastAPI(title="Forensic DVR Analysis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mock_cases = [
    Case(id="CASE-001", name="Operation Nightfall", created_at=datetime.utcnow(), status="Active")
]

mock_evidence = []

@app.get("/api/cases", response_model=list[Case])
def get_cases():
    return mock_cases

@app.post("/api/cases", response_model=Case)
def create_case(name: str, description: str = ""):
    new_case = Case(
        id=f"CASE-{uuid.uuid4().hex[:6].upper()}",
        name=name,
        created_at=datetime.utcnow(),
        status="Active",
        description=description
    )
    mock_cases.append(new_case)
    return new_case
