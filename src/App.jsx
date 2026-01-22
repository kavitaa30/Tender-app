import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TenderForm from "./components/Tender/TenderForm";
import Report from "./components/Report/Report";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile/Profile"; // ✅ NEW

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 Protected routes */}
        <Route
          path="/tender"
          element={
            <ProtectedRoute>
              <TenderForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />

        {/* ✅ PROFILE PAGE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
