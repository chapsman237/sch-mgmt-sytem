import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🚫 No token = go to login
  if (!token || !role) {
    return <Navigate to="/" replace />;
  }

  // ❌ Role not allowed = go to login
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Access granted
  return children;
};

export default ProtectedRoute;
