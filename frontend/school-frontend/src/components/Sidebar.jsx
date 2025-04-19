import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <h2>Admin</h2>
      <ul>
        <li
          onClick={() => handleNav("/admin")}
          className={location.pathname === "/admin" ? "active" : ""}
        >
          Dashboard
        </li>
        <li
          onClick={() => handleNav("/admin/create-user")}
          className={location.pathname === "/admin/create-user" ? "active" : ""}
        >
          Manage Users
        </li>
        <li>Manage Courses</li>
        <li>Reports</li>
        <li onClick={() => {
          localStorage.clear();
          navigate("/");
        }}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
