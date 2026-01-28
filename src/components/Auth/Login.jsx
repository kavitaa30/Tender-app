import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { generateCaptcha } from "../../utils/captcha";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (inputCaptcha !== captcha) {
      alert("Invalid captcha");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg);
        return;
      }

      // 🔹 Save user data
      localStorage.setItem("userId", data._id);
      localStorage.setItem("role", data.role);
       localStorage.setItem("status", data.status);


      // 🔹 ROLE BASED NAVIGATION
      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        // user
        if (data.status === "Pending") {
          alert("Waiting for admin approval");
          navigate("/pending");
        } else if (data.status === "Rejected") {
          alert("Your request is rejected");
          navigate("/rejected");
        } else {
          // Approved
          navigate("/tender");
        }
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-wrapper">
        <div className="auth-container">
          <div className="auth-panel left">
            <h2>Hello, Welcome!</h2>
            <p>Don't have an account?</p>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>

          <div className="auth-panel right">
            <h2>Login</h2>

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="captcha-row">
              <span>{captcha}</span>
              <button onClick={() => setCaptcha(generateCaptcha())}>↻</button>
            </div>

            <input
              placeholder="Enter Captcha"
              value={inputCaptcha}
              onChange={(e) => setInputCaptcha(e.target.value)}
            />

            <button className="main-btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
