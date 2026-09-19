from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Case(BaseModel):
    id: str
    name: str
    created_at: datetime
    status: str
    description: Optional[str] = None

class Evidence(BaseModel):
    id: str
    case_id: str
    type: str
    serial: str
    make: str
    model: str
    capacity_gb: int
    hash_md5: Optional[str] = None
    hash_sha256: Optional[str] = None
    format: Optional[str] = None
    status: str
