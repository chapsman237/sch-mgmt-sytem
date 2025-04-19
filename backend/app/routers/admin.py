from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import uuid4
from ..models.course import Course
from ..models.course_offering import CourseOffering
from ..schemas import CourseCreate, CourseUpdate, StudentCreate, TeacherCreate, AssignTeacherInput
from ..models import User, Student, Teacher
from ..database import get_db
from ..utils.auth import hash_password
from ..dependencies import admin_required
from fastapi.encoders import jsonable_encoder

router = APIRouter()

@router.post("/admin/create-student", dependencies=[Depends(admin_required)])
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.matric_no == student.matric_no).first():
        raise HTTPException(status_code=400, detail="Matriculation number already exists")

    user_id = str(uuid4())
    new_user = User(
        id=user_id,
        matric_no=student.matric_no,
        password_hash=hash_password(student.password),
        role="student"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    new_student = Student(
        id=new_user.id,
        full_name=student.full_name,
        dob=student.dob,
        pob=student.pob,
        gender=student.gender,
        program=student.program,
        major=student.major,
        phone_number=student.phone_number,
        parent_email=student.parent_email,
        parent_phone=student.parent_phone
    )
    db.add(new_student)
    db.commit()

    return {"message": "Student created successfully"}

@router.post("/admin/create-teacher", dependencies=[Depends(admin_required)])
def create_teacher(teacher: TeacherCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == teacher.username).first():
        raise HTTPException(status_code=400, detail="Username already exists")
    if db.query(Teacher).filter(Teacher.email == teacher.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    user_id = str(uuid4())
    new_user = User(
        id=user_id,
        username=teacher.username,
        password_hash=hash_password(teacher.password),
        role="teacher"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    new_teacher = Teacher(
        id=new_user.id,
        full_name=teacher.full_name,
        email=teacher.email,
        phone_number=teacher.phone_number,
        department=teacher.department
    )
    db.add(new_teacher)
    db.commit()

    return {"message": "Teacher created successfully"}

@router.post("/admin/create-course", dependencies=[Depends(admin_required)])
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    if db.query(Course).filter(Course.code == course.code).first():
        raise HTTPException(status_code=400, detail="Course code already exists")

    new_course = Course(
        code=course.code,
        title=course.title,
        credit=course.credit,
        level=course.level,
        semester=course.semester
    )
    db.add(new_course)
    db.commit()

    return {"message": "Course created successfully"}

@router.put("/admin/assign-teacher/{course_id}", dependencies=[Depends(admin_required)])
def assign_teacher_to_course(course_id: str, payload: AssignTeacherInput, db: Session = Depends(get_db)):
    existing = (
        db.query(CourseOffering)
        .filter(
            CourseOffering.course_id == course_id,
            CourseOffering.year == payload.year,
            CourseOffering.semester == payload.semester
        )
        .first()
    )

    if existing:
        existing.teacher_id = payload.teacher_id
        db.commit()
        return {"message": "Course offering updated."}

    new_offering = CourseOffering(
        course_id=course_id,
        teacher_id=payload.teacher_id,
        year=payload.year,
        semester=payload.semester
    )
    db.add(new_offering)
    db.commit()

    return {"message": "Teacher assigned to course."}

@router.get("/admin/courses", dependencies=[Depends(admin_required)])
def list_courses(db: Session = Depends(get_db)):
    courses = db.query(Course).all()
    return jsonable_encoder(courses)

@router.get("/admin/teachers", dependencies=[Depends(admin_required)])
def list_teachers(db: Session = Depends(get_db)):
    teachers = db.query(Teacher).all()
    return jsonable_encoder(teachers)
