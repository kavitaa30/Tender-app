import { NavLink, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-sidebar">
      <h2 className="admin-logo">Admin Panel</h2>

      <NavLink to="/admin-dashboard" className="admin-link">
        Dashboard
      </NavLink>

      <button className="admin-logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
