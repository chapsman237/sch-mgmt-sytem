from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models.user import User
from ..utils.auth import verify_password, create_access_token

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/login")
def login(
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    # Try to authenticate using either username or matric_no
    user = (
        db.query(User)
        .filter((User.username == username) | (User.matric_no == username))
        .first()
    )

    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(data={"sub": user.username or user.matric_no, "role": user.role})
    return {"access_token": token, "token_type": "bearer", "role": user.role}
