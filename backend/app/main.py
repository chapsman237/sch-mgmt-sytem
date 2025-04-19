from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from .models import user
from .routers import auth
from .routers import admin



# Create all tables
user.Base.metadata.create_all(bind=engine)

app = FastAPI()

# ✅ CORS Configuration
origins = [
    "http://localhost:3000",  # React frontend
    "http://127.0.0.1:3000",  # Also include this for safety
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Who can connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Route setup
app.include_router(auth.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {"message": "Backend is running"}
