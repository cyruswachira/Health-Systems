from pydantic import BaseModel
from typing import List

class ClientBase(BaseModel):
    name: str
    email: str

class ClientCreate(ClientBase):
    pass

class ClientOut(ClientBase):
    id: int

    class Config:
        from_attributes = True  # Updated for Pydantic v2


class ProgramBase(BaseModel):
    name: str
    description: str

class ProgramCreate(ProgramBase):
    pass

class ProgramOut(ProgramBase):
    id: int

    class Config:
        from_attributes = True  # Updated for Pydantic v2
