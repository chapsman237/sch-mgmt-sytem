from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from .utils.auth import decode_jwt  # 👈 Ensure this is available

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")  # This should match your login route

def admin_required(token: str = Depends(oauth2_scheme)):
    payload = decode_jwt(token)
    if not payload or payload.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
