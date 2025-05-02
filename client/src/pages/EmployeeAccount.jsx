import Navigation from "../components/Navigation";
import BlueButton from "../components/BlueButton";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EmployeeAccount = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");

  // Fetch employee id and clock-in status on mount
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get("/api/auth/status", { withCredentials: true });
        const id = res.data.user._id;
        setEmployeeId(id);
        // Check if currently clocked in
        const hoursRes = await axios.get(`/api/hours/employee/${id}`);
        const openClockIn = hoursRes.data.find(h => h.clockOut === null);
        setIsClockedIn(!!openClockIn);
        setStatusMsg("");
      } catch (err) {
        setStatusMsg("Error fetching status");
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  const handleClockIn = async () => {
    try {
      setLoading(true);
      await axios.post("/api/hours/clockin", { employeeId });
      setIsClockedIn(true);
      setStatusMsg("Clocked in successfully!");
    } catch (err) {
      setStatusMsg(err.response?.data?.message || "Clock in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClockOut = async () => {
    try {
      setLoading(true);
      await axios.post("/api/hours/clockout", { employeeId });
      setIsClockedIn(false);
      setStatusMsg("Clocked out successfully!");
    } catch (err) {
      setStatusMsg(err.response?.data?.message || "Clock out failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-account-page">
      <Navigation />
      <section className="employee-account">
        <h1>Employee Account</h1>
        <div>
          <BlueButton
            text="Pending Appointments"
            onClick={() => navigate("/pending-appointments")}
          />
          <BlueButton
            text="Assigned Appointments"
            onClick={() => navigate("/assigned-appointments")}
          />
          <BlueButton
            text="Services History"
            onClick={() => navigate("/employee-service-history")}
          />
          <BlueButton
            text="Edit Profile"
            onClick={() => navigate("/edit-profile")}
          />
        </div>
        <div style={{ marginTop: 30 }}>
          <h2>Work Hours</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>Status: <b>{isClockedIn ? "Clocked In" : "Clocked Out"}</b></p>
              <BlueButton
                text={isClockedIn ? "Clock Out" : "Clock In"}
                onClick={isClockedIn ? handleClockOut : handleClockIn}
              />
              {statusMsg && <p style={{ color: statusMsg.includes("success") ? "green" : "red" }}>{statusMsg}</p>}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default EmployeeAccount;