import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TenderForm.css";
import Navbar from "../Navbar/Navbar";

/* ===== LOCATION DATA (DEPENDENT DROPDOWNS) ===== */
const locationData = {
  Maharashtra: {
    Pune: ["Haveli", "Mulshi", "Shirur", "Baramati", "Daund"],
    Mumbai: ["Andheri", "Borivali", "Kurla", "Dadar", "Malad"],
    Nashik: ["Sinnar", "Igatpuri", "Niphad", "Yeola", "Chandwad"],
    Nagpur: ["Nagpur Urban", "Nagpur Rural", "Hingna", "Kamptee", "Parseoni"],
  },

  Gujarat: {
    Ahmedabad: ["Daskroi", "Sanand", "Detroj", "Bavla", "Ranpur"],
    Surat: ["Choryasi", "Palsana", "Olpad", "Mandvi", "Kamrej"],
    Vadodara: ["Savli", "Padra", "Karjan", "Dabhoi", "Vaghodia"],
  },

  Karnataka: {
    Bengaluru: [
      "Bangalore North",
      "Bangalore South",
      "Yelahanka",
      "Anekal",
      "Kengeri",
    ],
    Mysuru: ["Mysore", "Nanjangud", "Hunsur", "Krishnarajanagara", "Tirumakudal"],
    Hubballi: ["Hubballi Rural", "Dharwad", "Kalghatgi", "Kundgol"],
  },

  MadhyaPradesh: {
    Indore: ["Mhow", "Sanwer", "Depalpur", "Hatod", "Sawer"],
    Bhopal: ["Huzur", "Berasia", "Phanda", "Kolar", "Govindpura"],
    Jabalpur: ["Patan", "Sihora", "Panagar", "Majholi", "Shahpura"],
  },

  Rajasthan: {
    Jaipur: ["Amber", "Sanganer", "Jamwa Ramgarh", "Chomu", "Phulera"],
    Udaipur: ["Girwa", "Mavli", "Kherwara", "Salumber", "Lasadiya"],
    Jodhpur: ["Osian", "Bilara", "Bhopalgarh", "Phalodi", "Shergarh"],
  },

  UttarPradesh: {
    Lucknow: [
      "Bakshi Ka Talab",
      "Malihabad",
      "Sarojini Nagar",
      "Mohanlalganj",
      "Nigohan",
    ],
    Kanpur: ["Kanpur Nagar", "Bilhaur", "Ghatampur", "Kalyanpur", "Bithoor"],
    Noida: ["Dadri", "Jewar", "Dankaur", "Greater Noida", "Bisrakh"],
    Prayagraj: ["Soraon", "Karchhana", "Meja", "Phulpur", "Handia"],
  },

  Bihar: {
    Patna: ["Danapur", "Paliganj", "Barh", "Masaurhi", "Bikram"],
    Gaya: ["Tekari", "Sherghati", "Wazirganj", "Manpur", "Belaganj"],
  },

  WestBengal: {
    Kolkata: [
      "Alipore",
      "Ballygunge",
      "Salt Lake",
      "Behala",
      "Dum Dum",
    ],
    Howrah: ["Uluberia", "Domjur", "Bagnan", "Shibpur", "Amta"],
    Siliguri: ["Matigara", "Naxalbari", "Kharibari", "Phansidewa"],
  },

  TamilNadu: {
    Chennai: [
      "Tondiarpet",
      "Velachery",
      "Guindy",
      "Mylapore",
      "Tambaram",
    ],
    Coimbatore: ["Pollachi", "Mettupalayam", "Sulur", "Valparai", "Annur"],
    Madurai: ["Melur", "Thirumangalam", "Usilampatti", "Vadipatti", "Peraiyur"],
  },

  Telangana: {
    Hyderabad: [
      "Secunderabad",
      "Charminar",
      "Kukatpally",
      "Gachibowli",
      "LB Nagar",
    ],
    Warangal: ["Hanamkonda", "Kazipet", "Parkal", "Wardhannapet"],
  },

  Delhi: {
    Delhi: [
      "Central Delhi",
      "South Delhi",
      "North Delhi",
      "East Delhi",
      "West Delhi",
    ],
  },
};


const TenderForm = () => {
  const navigate = useNavigate();

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

    try {
      const res = await fetch("http://localhost:5000/api/tenders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      alert("✅ Tender Submitted Successfully");
      navigate("/report");
    } catch (err) {
      alert("❌ Error submitting tender");
    }
  };
const [form, setForm] = useState(initialForm);
const [editIndex, setEditIndex] = useState(null);

  return (
    <>
      <Navbar />

      <div className="tender-wrapper">
        <div className="tender-card">
          <h2 className="tender-title">
            {editIndex !== null ? "Edit Tender" : "Tender Filling Form"}
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

            {/* STATE */}
            <div>
              <label>State</label>
              <select
                name="state"
                value={form.state}
                onChange={(e) =>
                  setForm({
                    ...form,
                    state: e.target.value,
                    district: "",
                    city: "",
                  })
                }
              >
                <option value="">Select State</option>
                {Object.keys(locationData).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* DISTRICT */}
            <div>
              <label>District</label>
              <select
                name="district"
                value={form.district}
                disabled={!form.state}
                onChange={(e) =>
                  setForm({
                    ...form,
                    district: e.target.value,
                    city: "",
                  })
                }
              >
                <option value="">Select District</option>
                {form.state &&
                  Object.keys(locationData[form.state]).map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
              </select>
            </div>

            {/* CITY / TALUKA */}
            <div>
              <label>City / Taluka</label>
              <select
                name="city"
                value={form.city}
                disabled={!form.district}
                onChange={handleChange}
              >
                <option value="">Select City / Taluka</option>
                {form.state &&
                  form.district &&
                  locationData[form.state][form.district].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
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
              {editIndex !== null ? "Update Tender" : "Submit Tender"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenderForm;
