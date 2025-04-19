from sqlalchemy import Column, String, Enum, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from ..database import Base
import enum
import uuid

class RoleEnum(str, enum.Enum):
    student = "student"
    teacher = "teacher"
    admin = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False)
    username = Column(String, unique=True, nullable=True)  # for teacher/admin
    matric_no = Column(String, unique=True, nullable=True) # for students
    password_hash = Column(String, nullable=False)
    role = Column(Enum(RoleEnum, name="roleenum"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
