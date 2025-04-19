import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateUserPage from "./pages/CreateUserPage";
import CreateCoursePage from "./pages/CreateCoursePage"; // ✅

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-user"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateUserPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-course"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateCoursePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <h1>Teacher Dashboard</h1>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <h1>Student Dashboard</h1>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
