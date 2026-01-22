import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login first");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
