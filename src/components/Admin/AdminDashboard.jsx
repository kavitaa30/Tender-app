import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import Navbar from "../Navbar/Navbar";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data.filter(u => u.role !== "admin")));
  }, []);

  const updateStatus = async (id, action) => {
    await fetch(`http://localhost:5000/api/users/${action}/${id}`, {
      method: "PUT"
    });

    setUsers(users.map(user =>
      user._id === id
        ? { ...user, status: action === "approve" ? "Approved" : "Rejected" }
        : user
    ));
  };

  return (
    <>
      {/* 🔹 NAVBAR FULL WIDTH (TOP) */}
      <Navbar />

      {/* 🔹 SIDEBAR + CONTENT */}
      <div style={{ display: "flex" }}>

        <AdminSidebar />

        <div
          style={{
            marginLeft: "250px",
            padding: "30px",
            width: "100%"
          }}
        >
          <h2>Admin Dashboard</h2>

          <table border="1" width="100%" cellPadding="10">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.status}</td>
                  <td>
                    <button onClick={() => updateStatus(user._id, "approve")}>
                      Approve
                    </button>
                    <button onClick={() => updateStatus(user._id, "reject")}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
