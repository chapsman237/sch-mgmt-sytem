from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from ..database import Base

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    phone_number = Column(String, nullable=False)
    department = Column(String, nullable=False)
