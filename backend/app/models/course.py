from sqlalchemy import Column, String, Integer
from sqlalchemy.dialects.postgresql import UUID
from ..database import Base
import uuid

class Course(Base):
    __tablename__ = "courses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False)
    code = Column(String, unique=True, nullable=False)
    title = Column(String, nullable=False)
    credit = Column(Integer, nullable=False)
    level = Column(String, nullable=True)
    semester = Column(String, nullable=True)
