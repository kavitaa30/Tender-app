import { useEffect, useState } from "react";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";


const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const userId = localStorage.getItem("userId");

  // 🔹 FETCH USER DATA FROM DB
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}`);
        const data = await res.json();

        setForm((prev) => ({
          ...prev,
          fullName: data.fullName,
          email: data.email,
          mobile: data.mobile
        }));

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  // 🔹 INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 IMAGE (OPTIONAL)
  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // 🔹 SAVE PROFILE
  const handleSave = async () => {
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      alert("New password & confirm password do not match");
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName: form.fullName,
          mobile: form.mobile,
          newPassword: form.newPassword
        })
      });

      alert("Profile updated successfully");
      setEdit(false);
    } catch (err) {
      alert("Update failed");
    }
  };

  // 🔹 DELETE ACCOUNT
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE"
      });

      localStorage.clear();
      alert("Account deleted");
      window.location.href = "/login";
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  return (
    <>
          <Navbar />
    <div className="profile-container">

      {/* LEFT CARD */}
      <div className="profile-left">
        <div className="profile-img">
          {image ? (
            <img src={image} alt="profile" />
          ) : (
            <div className="no-img">No Photo</div>
          )}
        </div>

        <label className="upload-btn">
          Upload Photo
          <input type="file" hidden onChange={handleImage} />
        </label>

        <h3>{form.fullName}</h3>
        <p className="role">User</p>
      </div>

      {/* RIGHT CARD */}
      <div className="profile-right">
        <div className="profile-header">
          <h2>Profile</h2>
          <button onClick={() => setEdit(!edit)}>
            {edit ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="form-grid">
          <div>
            <label>Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              readOnly={!edit}
            />
          </div>

          <div>
            <label>Email</label>
            <input value={form.email} readOnly />
          </div>

          <div>
            <label>Mobile</label>
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              readOnly={!edit}
            />
          </div>

          <div>
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              onChange={handleChange}
              disabled={!edit}
            />
          </div>

          <div>
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              onChange={handleChange}
              disabled={!edit}
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              disabled={!edit}
            />
          </div>
        </div>

        {edit && (
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        )}

        <div className="profile-actions">
  <button className="delete-btn" onClick={handleDelete}>
    Delete Account
  </button>
</div>

      </div>
    </div>
     </>
  );
};

export default Profile;
