import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";

const ApproveHours = () => {
  const [submittedHours, setSubmittedHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHours = async () => {
      try {
        const response = await axios.get("/api/employee-hours");
        setSubmittedHours(response.data.hours || []);
      } catch (err) {
        setError("Failed to load submitted hours.");
      } finally {
        setLoading(false);
      }
    }; 

    fetchHours();
  }, []);

  const handleDecision = async (id, decision) => {
    try {
      await axios.put(`/api/employee-hours/${id}/status`, { status: decision });
      setSubmittedHours(prev =>
        prev.map(entry =>
          entry._id === id ? { ...entry, status: decision } : entry
        )
      );
    } catch {
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="approve-hours">
      <Navigation />
      <div className="approve-hours-box">
        <h1>Review Submitted Employee Hours</h1>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && submittedHours.length === 0 && <p>No submissions found.</p>}

        <ul style={{ listStyle: "none", padding: 0 }}>
          {submittedHours.map((entry) => (
            <li key={entry._id} style={{ 
              backgroundColor: "rgba(0, 0, 0, 0.7)", 
              padding: "15px", 
              borderRadius: "10px", 
              marginBottom: "20px",
              maxWidth: "600px",
              margin: "0 auto 20px auto",
              color: "white"
            }}>
              <p>
                <strong>Employee:</strong> {entry.employeeName}<br />
                <strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}<br />
                <strong>Hours:</strong> {entry.hours}<br />
                <strong>Status:</strong> {entry.status}
              </p>
              {entry.status === "pending" && (
                <div style={{ marginTop: "10px" }}>
                  <button 
                    onClick={() => handleDecision(entry._id, "approved")} 
                    style={{ marginRight: "10px", padding: "8px 12px", cursor: "pointer" }}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleDecision(entry._id, "rejected")} 
                    style={{ padding: "8px 12px", cursor: "pointer" }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApproveHours;
