from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional

class StudentCreate(BaseModel):
    matric_no: str
    password: str
    full_name: str
    dob: date
    pob: str
    gender: str
    program: str
    major: Optional[str]
    phone_number: str
    parent_email: EmailStr
    parent_phone: str

class TeacherCreate(BaseModel):
    username: str
    password: str
    full_name: str
    email: EmailStr
    phone_number: str
    department: str

class CourseCreate(BaseModel):
    code: str
    title: str
    credit: int
    level: Optional[str]
    semester: Optional[str]

class CourseUpdate(BaseModel):
    title: Optional[str]
    credit: Optional[int]
    level: Optional[str]
    semester: Optional[str]
    teacher_id: Optional[str]  # ✅ This allows assigning teacher

class AssignTeacherInput(BaseModel):
    teacher_id: str
    year: int
    semester: str
