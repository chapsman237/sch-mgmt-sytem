import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    usernameOrMatric: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const form = new URLSearchParams();
      form.append("username", formData.usernameOrMatric);
      form.append("password", formData.password);

      const response = await axios.post("http://127.0.0.1:8000/login", form, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("🔁 Server Response:", response.data);

      const { access_token, role } = response.data;

      if (!access_token || !role) {
        throw new Error("Missing token or role from server");
      }

      // ✅ Save to localStorage for auth guard
      localStorage.setItem("token", access_token);
      localStorage.setItem("role", role);

      // ✅ Navigate to respective dashboard
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "student") {
        navigate("/student");
      } else if (role === "teacher") {
        navigate("/teacher");
      } else {
        setError("Invalid role returned.");
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-placeholder"></div>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <input
            type="text"
            name="usernameOrMatric"
            placeholder="Username or Matric No"
            value={formData.usernameOrMatric}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
