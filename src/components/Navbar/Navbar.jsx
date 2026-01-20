import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const protectedNav = (path) => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar-glass">
      {/* LEFT */}
      <div className="brand" onClick={() => navigate("/")}>
        Tender<span>App</span>
      </div>

      {/* RIGHT */}
      <div className="nav-links">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>

        <span onClick={() => protectedNav("/tender")}>
          Tender Form
        </span>

        <span onClick={() => protectedNav("/report")}>
          Report
        </span>

        {user && (
          <span className="logout-btn" onClick={logout}>
            Logout
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
