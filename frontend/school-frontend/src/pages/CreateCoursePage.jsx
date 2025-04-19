import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Dashboard.css";

const CreateCoursePage = () => {
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    credit: "",
    level: "",
    semester: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const token = localStorage.getItem("token");

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/admin/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to load courses:", err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/admin/teachers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(res.data);
    } catch (err) {
      console.error("Failed to load teachers:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await axios.post("http://127.0.0.1:8000/admin/create-course", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("✅ Course created successfully!");
      setFormData({
        code: "",
        title: "",
        credit: "",
        level: "",
        semester: "",
      });
      fetchCourses();
    } catch (err) {
      setError(
        err.response?.data?.detail || "❌ Failed to create course. Try again."
      );
    }
  };

  const handleAssignTeacher = async (courseId, teacherId) => {
    const currentYear = new Date().getFullYear();
    const semester = "Fall"; // You can enhance this later with a dynamic field

    try {
      await axios.put(
        `http://127.0.0.1:8000/admin/assign-teacher/${courseId}`,
        {
          teacher_id: teacherId,
          year: currentYear,
          semester: semester,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCourses();
    } catch (err) {
      alert("❌ Failed to assign teacher.");
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-content">
          <h2>Create Courses</h2>
          <form onSubmit={handleSubmit} className="form-container">
            <input
              type="text"
              name="code"
              placeholder="Course Code"
              value={formData.code}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Course Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="credit"
              placeholder="Credit"
              value={formData.credit}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="level"
              placeholder="Level"
              value={formData.level}
              onChange={handleChange}
            />
            <input
              type="text"
              name="semester"
              placeholder="Semester"
              value={formData.semester}
              onChange={handleChange}
            />
            <button type="submit">Create Course</button>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>

          <h3 style={{ marginTop: "40px" }}>Course List</h3>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Title</th>
                <th>Level</th>
                <th>Semester</th>
                <th>Assign Teacher</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.code}</td>
                  <td>{course.title}</td>
                  <td>{course.level}</td>
                  <td>{course.semester}</td>
                  <td>
                    <select
                      onChange={(e) =>
                        handleAssignTeacher(course.id, e.target.value)
                      }
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Teacher
                      </option>
                      {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.full_name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
