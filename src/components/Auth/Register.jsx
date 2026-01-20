import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import Navbar from "../Navbar/Navbar";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fname: "",
    mname: "",
    lname: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const fullName = `${form.fname} ${form.mname} ${form.lname}`.trim();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.password !== form.confirmPassword) {
      alert("Password mismatch");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ ...form, fullName }));
    alert("Registration successful");
    navigate("/login");
  };

  return (
    <>
    <Navbar />
    <div className="auth-wrapper">
      <div className="auth-container reverse">

        {/* LEFT */}
        <div className="auth-panel left">
          <h2>Welcome Back!</h2>
          <p>Already have an account?</p>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>

        {/* RIGHT */}
        <div className="auth-panel right scroll">
  <h2 className="auth-title">Create Account</h2>
  <p className="sub-text">Fill details to register</p>

  <input name="fname" placeholder="First Name" onChange={handleChange} />
  <input name="mname" placeholder="Middle Name" onChange={handleChange} />
  <input name="lname" placeholder="Last Name" onChange={handleChange} />
  <input value={fullName} placeholder="Full Name" disabled />
  <input name="mobile" placeholder="Mobile Number" onChange={handleChange} />
  <input name="email" placeholder="Email Address" onChange={handleChange} />
  <input type="password" name="password" placeholder="Password" onChange={handleChange} />
  <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />

  <button className="main-btn" onClick={handleSubmit}>
    Register
  </button>
</div>


      </div>
    </div>
    </>
  );
};

export default Register;
