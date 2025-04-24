from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import models, schemas
from database import get_db
from typing import List

router = APIRouter(prefix="/programs", tags=["Programs"])

@router.post("/", response_model=schemas.ProgramOut)
def create_program(program: schemas.ProgramCreate, db: Session = Depends(get_db)):
    db_program = models.Program(**program.dict())
    db.add(db_program)
    db.commit()
    db.refresh(db_program)
    return db_program

@router.get("/", response_model=List[schemas.ProgramOut])
def get_programs(db: Session = Depends(get_db)):
    return db.query(models.Program).all()
