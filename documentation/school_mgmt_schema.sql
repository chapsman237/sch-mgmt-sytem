
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username TEXT UNIQUE,
    matric_no TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT CHECK (role IN ('student', 'teacher', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
    id UUID PRIMARY KEY REFERENCES users(id),
    full_name TEXT NOT NULL,
    dob DATE NOT NULL,
    pob TEXT NOT NULL,
    gender TEXT,
    program TEXT NOT NULL,
    major TEXT,
    phone_number TEXT,
    parent_email TEXT,
    parent_phone TEXT
);

CREATE TABLE teachers (
    id UUID PRIMARY KEY REFERENCES users(id),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone_number TEXT,
    department TEXT
);

CREATE TABLE courses (
    id UUID PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    credit INT NOT NULL,
    level TEXT,
    semester TEXT
);

CREATE TABLE prerequisites (
    id UUID PRIMARY KEY,
    course_id UUID REFERENCES courses(id),
    prerequisite_id UUID REFERENCES courses(id)
);

CREATE TABLE course_offerings (
    id UUID PRIMARY KEY,
    course_id UUID REFERENCES courses(id),
    teacher_id UUID REFERENCES teachers(id),
    year INT NOT NULL,
    semester TEXT NOT NULL
);

CREATE TABLE registrations (
    id UUID PRIMARY KEY,
    student_id UUID REFERENCES students(id),
    course_id UUID REFERENCES courses(id),
    year INT NOT NULL,
    semester TEXT NOT NULL,
    status TEXT DEFAULT 'active'
);

CREATE TABLE timetables (
    id UUID PRIMARY KEY,
    course_id UUID REFERENCES courses(id),
    day_of_week TEXT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location TEXT
);

CREATE TABLE tracking_sheets (
    id UUID PRIMARY KEY,
    department TEXT,
    program TEXT,
    semester TEXT,
    courses JSONB
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    sender_id UUID REFERENCES users(id),
    receiver_role TEXT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE results (
    id UUID PRIMARY KEY,
    student_id UUID REFERENCES students(id),
    course_id UUID REFERENCES courses(id),
    assignment INT,
    project INT,
    exam INT,
    attendance INT,
    final_grade INT,
    created_at TIMESTAMP
);

CREATE TABLE ca_scores (
    id UUID PRIMARY KEY,
    student_id UUID REFERENCES students(id),
    course_id UUID REFERENCES courses(id),
    assessment_no INT,
    score INT,
    teacher_id UUID REFERENCES teachers(id),
    created_at TIMESTAMP
);

CREATE TABLE attendance_sheets (
    id UUID PRIMARY KEY,
    course_id UUID REFERENCES courses(id),
    semester TEXT,
    year INT,
    students_list JSONB
);

CREATE TABLE groups (
    id UUID PRIMARY KEY,
    course_id UUID REFERENCES courses(id),
    student_id UUID REFERENCES students(id),
    semester TEXT
);

CREATE TABLE transcripts (
    id UUID PRIMARY KEY,
    student_id UUID REFERENCES students(id),
    data JSONB
);