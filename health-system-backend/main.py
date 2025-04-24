from fastapi import FastAPI
from database import Base, engine
from routers import clients, programs

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(clients.router)
app.include_router(programs.router)
