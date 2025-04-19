from sqlalchemy import Column, String, Date
from sqlalchemy.dialects.postgresql import UUID
from ..database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    dob = Column(Date, nullable=False)
    pob = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    program = Column(String, nullable=False)
    major = Column(String, nullable=True)
    phone_number = Column(String, nullable=False)
    parent_email = Column(String, nullable=False)
    parent_phone = Column(String, nullable=False)
