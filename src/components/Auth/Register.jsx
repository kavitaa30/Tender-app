import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();

  const mobileRegex = /^[5-9]\d{9}$/;


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

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Password mismatch");
      return;
    }
    if (!mobileRegex.test(form.mobile)) {
  alert("Mobile number must be 10 digits");
  return;
}


    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          mobile: form.mobile,
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg);
        return;
      }

      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-wrapper">
        <div className="auth-container reverse">

          <div className="auth-panel left">
            <h2>Welcome Back!</h2>
            <p>Already have an account?</p>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>

          <div className="auth-panel right scroll">
            <h2>Create Account</h2>

            <input name="fname" placeholder="First Name" onChange={handleChange} />
            <input name="mname" placeholder="Middle Name" onChange={handleChange} />
            <input name="lname" placeholder="Last Name" onChange={handleChange} />
            <input value={fullName} placeholder="Full Name" disabled />
           <input
             name="mobile"
             placeholder="Mobile Number"
             maxLength="10"
             value={form.mobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setForm({ ...form, mobile: value });
            }}
           />

            <input name="email" placeholder="Email" onChange={handleChange} />
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
