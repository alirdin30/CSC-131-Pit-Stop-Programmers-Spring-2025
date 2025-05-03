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
        const response = await axios.get("/api/hours/submitted");
        setSubmittedHours(response.data.hours || []);
      } catch {
        setError("Failed to load submitted hours.");
      } finally {
        setLoading(false);
      }
    };
    fetchHours();
  }, []);

  const handleDecision = async (id, decision) => {
    try {
      await axios.put(`/api/hours/${id}/status`, { status: decision });
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
    <div className="approve-hours-page">
      <Navigation />
      <div className="approve-hours-box">
        <h1>Review Submitted Employee Hours</h1>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && submittedHours.length === 0 && <p>No submissions found.</p>}

        <ul className="approve-hours-list">
          {submittedHours.map((entry) => (
            <li key={entry._id} className="approve-hours-entry">
              <div><b>Employee:</b> {entry.employee?.name || entry.employee?.email || entry.employee}</div>
              <div><b>Clock In:</b> {entry.clockIn ? new Date(entry.clockIn).toLocaleString() : 'N/A'}</div>
              <div><b>Clock Out:</b> {entry.clockOut ? new Date(entry.clockOut).toLocaleString() : 'N/A'}</div>
              <div><b>Status:</b> <span className={`approve-hours-status approve-hours-status-${entry.status}`}>{entry.status}</span></div>
              {entry.status === 'pending' && (
                <div className="approve-hours-actions">
                  <button className="approve-hours-btn approve-hours-btn-approve" onClick={() => handleDecision(entry._id, 'approved')}>Approve</button>
                  <button className="approve-hours-btn approve-hours-btn-deny" onClick={() => handleDecision(entry._id, 'denied')}>Deny</button>
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