import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateCaptcha } from "../../utils/captcha";
import "./Auth.css";
import Navbar from "../Navbar/Navbar";


const Login = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleLogin = () => {
    if (!user) {
      alert("Please register first");
      return;
    }

    if (
      email === user.email &&
      password === user.password &&
      inputCaptcha === captcha
    ) {
      navigate("/tender");
    } else {
      alert("Invalid credentials or captcha");
    }
  };

  return (
     <>
    <Navbar />
    <div className="auth-wrapper">
      <div className="auth-container">

        {/* LEFT */}
        <div className="auth-panel left">
          <h2>Hello, Welcome!</h2>
          <p>Don't have an account?</p>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>

        {/* RIGHT */}
        <div className="auth-panel right">
          <h2>Login</h2>

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="captcha-row">
            <span>{captcha}</span>
            <button onClick={() => setCaptcha(generateCaptcha())}>↻</button>
          </div>

          <input
            placeholder="Enter Captcha"
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
