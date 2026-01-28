import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TenderForm.css";
import Navbar from "../Navbar/Navbar";


const editId = localStorage.getItem("editId");
const user = JSON.parse(localStorage.getItem("user"));
const mobileRegex = /^[5-9]\d{9}$/;


const TenderForm = () => {
  const navigate = useNavigate();

  const [locationData, setLocationData] = useState({});
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

 

  const initialForm = {
    type: "",
    fullName: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    mobile: "",
    email: "",
    license: "",
    gst: "",
    goodsType: "",
    demand: "",
    rate: "",
    remarks: "",
    passportPhoto: "",
    aadhar: "",
    pan: "",
    gstCert: "",
    licenseCert: "",
  };

  /* ===== INPUT HANDLERS (FIXED) ===== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert("File size must be less than 1 MB");
      return;
    }

    setForm({ ...form, [e.target.name]: file.name });
  };

  /* ===== SUBMIT ===== */
  const handleSubmit = async () => {
  if (
    !form.type ||
    !form.fullName ||
    !form.mobile ||
    !form.email ||
    !form.goodsType ||
    !form.license ||
    !form.gst
  ) {
    alert("Please fill all required fields");
    return;
  }

  if (!mobileRegex.test(form.mobile)) {
  alert("Mobile number must be 10 digits");
  return;
}


  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Please login again");
    return;
  }

  try {
    const url = editId
      ? `http://localhost:5000/api/tenders/${editId}`
      : "http://localhost:5000/api/tenders";

    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId }),
    });

    if (!res.ok) throw new Error("Failed");

    alert(editId ? "Tender Updated Successfully" : "Tender Submitted Successfully");

    localStorage.removeItem("editId");
    navigate("/report");
  } catch (err) {
    alert("Error saving tender");
  }
};



const [form, setForm] = useState(initialForm);
useEffect(() => {
  if (!editId) return;

  const fetchTender = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tenders/single/${editId}`
      );
      const data = await res.json();
      setForm({
  ...initialForm,
  ...data
});

    } catch (err) {
      console.log(err);
    }
  };

  fetchTender();
}, []);


// ======================== STATES ========================
// Fetch all states
useEffect(() => {
  fetch("http://localhost:5000/api/locations/states")
    .then(res => res.json())
    .then(data => setStates(data))
    .catch(err => console.log(err));
    
}, []);

// Fetch districts when state changes
useEffect(() => {
  if (!form.state) return;

  fetch(`http://localhost:5000/api/locations/districts/${form.state}`)
    .then(res => res.json())
    .then(data => setDistricts(data))
    .catch(err => console.log(err));
}, [form.state]);

// Fetch cities when district changes
useEffect(() => {
  if (!form.state || !form.district) return;

  fetch(`http://localhost:5000/api/locations/cities/${form.state}/${form.district}`)
    .then(res => res.json())
    .then(data => setCities(data))
    .catch(err => console.log(err));
}, [form.state, form.district]);






//const [editIndex, setEditIndex] = useState(null);

  return (
    <>
      <Navbar />

      <div className="tender-wrapper">
        <div className="tender-card">
          <h2 className="tender-title">
            {editId ? "Edit Tender" : "Tender Filling Form"}

          </h2>

          <div className="tender-grid">
            {/* TYPE */}
            <div>
              <label>Type *</label>
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="">Select</option>
                <option>Broker</option>
                <option>Purchaser</option>
                <option>Wholesaler</option>
              </select>
            </div>

            {/* FULL NAME */}
            <div>
              <label>Full Name *</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>

            {/* MOBILE */}
            <div>
              <label>Mobile *</label>
              <input
                name="mobile"
                maxLength="10"
                value={form.mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setForm({ ...form, mobile: value });
                }}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label>Email *</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label>Address *</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>

           {/* ===== STATE ===== */}
{/* ===== STATE ===== */}
<div>
  <label>State *</label>
  <select
  name="state"
  value={form.state}
  onChange={(e) => {
    const state = e.target.value;
    setForm({ ...form, state, district: "", city: "" });
  }}
>
  <option value="">Select State</option>
  {states.map((s) => (
    <option key={s} value={s}>{s}</option>
  ))}
</select>
</div>

{/* ===== DISTRICT ===== */}
<div>
  <label>District *</label>
  <select
  name="district"
  value={form.district}
  onChange={(e) => {
    const district = e.target.value;
    setForm({ ...form, district, city: "" });
  }}
>
  <option value="">Select District</option>
  {districts.map((d) => (
    <option key={d} value={d}>{d}</option>
  ))}
</select>
</div>

{/* ===== CITY ===== */}
<div>
  <label>City / Taluka *</label>
 <select
  name="city"
  value={form.city}
  onChange={(e) => setForm({ ...form, city: e.target.value })}
>
  <option value="">Select City / Taluka</option>
  {cities.map((c) => (
    <option key={c} value={c}>{c}</option>
  ))}
</select>
</div>


            {/* PINCODE */}
            <div>
              <label>Pincode</label>
              <input
                name="pincode"
                maxLength="6"
                value={form.pincode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setForm({ ...form, pincode: value });
                }}
              />
            </div>

            {/* LICENSE */}
            <div className="radio-card equal-height">
              <label className="radio-title">Do you have License? *</label>
              <div className="radio-options">
                <div
                  className={`radio-box ${
                    form.license === "Yes" ? "active" : ""
                  }`}
                  onClick={() => setForm({ ...form, license: "Yes" })}
                >
                  Yes
                </div>
                <div
                  className={`radio-box ${
                    form.license === "No" ? "active" : ""
                  }`}
                  onClick={() => setForm({ ...form, license: "No" })}
                >
                  No
                </div>
              </div>
            </div>

            {/* GST */}
            <div className="radio-card equal-height">
              <label className="radio-title">Do you have GST? *</label>
              <div className="radio-options">
                <div
                  className={`radio-box ${
                    form.gst === "Yes" ? "active" : ""
                  }`}
                  onClick={() => setForm({ ...form, gst: "Yes" })}
                >
                  Yes
                </div>
                <div
                  className={`radio-box ${
                    form.gst === "No" ? "active" : ""
                  }`}
                  onClick={() => setForm({ ...form, gst: "No" })}
                >
                  No
                </div>
              </div>
            </div>

            {/* GOODS TYPE */}
            <div>
              <label>Goods Type *</label>
              <select
                name="goodsType"
                value={form.goodsType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Ash</option>
                <option>Ethanol</option>
                <option>Fusel Oil</option>
                <option>Pressmud</option>
                <option>Sugar</option>
              </select>
            </div>

            {/* DEMAND */}
            <div>
              <label>Goods Demand *</label>
              <input
                name="demand"
                value={form.demand}
                onChange={handleChange}
              />
            </div>

            {/* RATE */}
            <div>
              <label>Sale Rate *</label>
              <input
                name="rate"
                value={form.rate}
                onChange={handleChange}
              />
            </div>

            {/* REMARKS */}
            <div className="full-width">
              <label>Remarks</label>
              <textarea
                rows="3"
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
              />
            </div>

            {/* FILE UPLOADS */}
            <div>
              <label>Passport Size Photo *</label>
              <input
                type="file"
                name="passportPhoto"
                onChange={handleFileChange}
              />
              <small>{form.passportPhoto}</small>
            </div>

            <div>
              <label>Aadhar Copy *</label>
              <input
                type="file"
                name="aadhar"
                onChange={handleFileChange}
              />
              <small>{form.aadhar}</small>
            </div>

            <div>
              <label>PAN Copy *</label>
              <input type="file" name="pan" onChange={handleFileChange} />
              <small>{form.pan}</small>
            </div>

            <div>
              <label>GST Certificate *</label>
              <input
                type="file"
                name="gstCert"
                onChange={handleFileChange}
              />
              <small>{form.gstCert}</small>
            </div>

            <div>
              <label>License Certificate *</label>
              <input
                type="file"
                name="licenseCert"
                onChange={handleFileChange}
              />
              <small>{form.licenseCert}</small>
            </div>
          </div>

          <div className="tender-btn">
            <button onClick={handleSubmit}>
              {editId ? "Update Tender" : "Submit Tender"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenderForm;
