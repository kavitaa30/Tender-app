import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "./Report.css";
import Navbar from "../Navbar/Navbar";

const Report = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // Fetch tenders from backend
  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tenders");
        const tenders = await res.json();
        setData(tenders);
      } catch (err) {
        console.error("Error fetching tenders:", err);
      }
    };

    fetchTenders();
  }, []);

  const handleEdit = (id) => {
    // Save the tender ID to edit
    localStorage.setItem("editId", id);
    navigate("/tender");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tender?")) return;

    try {
      await fetch(`http://localhost:5000/api/tenders/${id}`, {
        method: "DELETE",
      });

      // Update state after delete
      setData(data.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting tender:", err);
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tender Report");
    XLSX.writeFile(wb, "Tender_Report.xlsx");
  };

  return (
    <>
      <Navbar />
      <div className="report-page">
        <div className="report-card">
          <div className="report-header">
            <h2>Tender Report</h2>
            <button className="export-btn" onClick={exportToExcel}>
              Export Excel
            </button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Full Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>District</th>
                  <th>State</th>
                  <th>Pincode</th>
                  <th>License</th>
                  <th>GST</th>
                  <th>Goods Type</th>
                  <th>Demand</th>
                  <th>Rate</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="16" className="no-data">
                      No Records Found
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr key={item._id}>
                      <td>{item.type}</td>
                      <td>{item.fullName}</td>
                      <td>{item.mobile}</td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>{item.city}</td>
                      <td>{item.district}</td>
                      <td>{item.state}</td>
                      <td>{item.pincode}</td>
                      <td>{item.license}</td>
                      <td>{item.gst}</td>
                      <td>{item.goodsType}</td>
                      <td>{item.demand}</td>
                      <td>{item.rate}</td>
                      <td>{item.remarks}</td>
                      <td className="action-col">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(item._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
