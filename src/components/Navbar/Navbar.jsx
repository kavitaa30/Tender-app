import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      fetch(`http://localhost:5000/api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => setUser(null));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar-glass">
      <div className="brand" onClick={() => navigate("/")}>
        Tender<span>App</span>
      </div>

      <div className="nav-links">
        {/* Login & Register always visible */}
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>

        {/* Extra links only when user is logged in */}
        {user && (
          <>
            <span onClick={() => navigate("/tender")}>Tender Form</span>
            <span onClick={() => navigate("/report")}>Report</span>
            <span onClick={() => navigate("/profile")}>Profile</span>
            <span className="logout-btn" onClick={logout}>
              Logout
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
