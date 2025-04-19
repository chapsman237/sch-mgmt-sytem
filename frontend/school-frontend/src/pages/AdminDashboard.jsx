import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Dashboard.css";

const AdminDashboard = () => {
  const functions = [
    "Create User & Assign Role",
    "Create Courses & Assign Teachers",
    "View All Students",
    "Send Notifications",
    "Open/Close Registration",
    "Generate Reports",
    "Update Semester Timetable",
    "Update Tracking Sheets",
  ];

  const handleClick = (title) => {
    if (title === "Create User & Assign Role") {
      window.location.href = "/admin/create-user";
    } else if (title === "Create Courses & Assign Teachers") {
      window.location.href = "/admin/create-course";
    }
    // You can add other navigations for different cards later
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-content">
          <h2>Welcome Admin</h2>
          <p>This is your dashboard.</p>

          <div className="admin-actions-grid">
            {functions.map((title, idx) => (
              <div
                key={idx}
                className="action-card"
                onClick={() => handleClick(title)}
                style={{ cursor: "pointer" }}
              >
                <h4>{title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
