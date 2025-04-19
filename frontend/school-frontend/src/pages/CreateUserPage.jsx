import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Dashboard.css"; // reuse styling

const CreateUserPage = () => {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const endpoint =
        role === "student" ? "/admin/create-student" : "/admin/create-teacher";

      const response = await axios.post(`http://localhost:8000${endpoint}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(response.data.message);
      navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-content">
          <h2>Create User & Assign Role</h2>

          <label>
            Select Role:
            <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </label>

          <form onSubmit={handleSubmit} className="form-container">
            {role === "student" ? (
              <>
                <input name="matric_no" placeholder="Matric No" onChange={handleChange} required />
                <input name="password" placeholder="Password" onChange={handleChange} required type="password" />
                <input name="full_name" placeholder="Full Name" onChange={handleChange} required />
                <input name="dob" type="date" onChange={handleChange} required />
                <input name="pob" placeholder="Place of Birth" onChange={handleChange} required />
                <input name="gender" placeholder="Gender" onChange={handleChange} required />
                <input name="program" placeholder="Program" onChange={handleChange} required />
                <input name="major" placeholder="Major (optional)" onChange={handleChange} />
                <input name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
                <input name="parent_email" placeholder="Parent Email" onChange={handleChange} required type="email" />
                <input name="parent_phone" placeholder="Parent Phone" onChange={handleChange} required />
              </>
            ) : (
              <>
                <input name="username" placeholder="Username" onChange={handleChange} required />
                <input name="password" placeholder="Password" onChange={handleChange} required type="password" />
                <input name="full_name" placeholder="Full Name" onChange={handleChange} required />
                <input name="email" placeholder="Email" onChange={handleChange} required type="email" />
                <input name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
                <input name="department" placeholder="Department" onChange={handleChange} required />
              </>
            )}
            <button type="submit">Create {role}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;
