import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import { UserContext } from "../context/UserContext";

const ApproveHours = () => {
  const { userRole } = useContext(UserContext);
  const [hoursSubmissions, setHoursSubmissions] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch hours submissions
  const fetchHourSubmissions = async () => {
    try {
      setLoading(true);
      
      console.log("Starting API request to fetch hours submissions...");
      
      const response = await axios.get("/api/hoursSubmitted", { 
        withCredentials: true,
        timeout: 15000,  // Increased timeout
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log("API Response:", response.data);
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);
      
      let submissions = [];
      
      if (Array.isArray(response.data) && response.data.length > 0) {
        submissions = response.data;
        console.log(`Successfully parsed ${submissions.length} submissions`);
      } else if (response.data && Array.isArray(response.data.hours)) {
        submissions = response.data.hours;
        console.log(`Successfully parsed ${submissions.length} submissions from hours property`);
      } else if (response.data && typeof response.data === 'object') {
        // If we get a single object, put it in an array
        submissions = [response.data];
        console.log(`Parsed single submission object`);
      } else {
        console.log("No submissions data found in response structure:", response.data);
      }
      
      if (submissions.length > 0) {
        const sortedSubmissions = [...submissions].sort((a, b) => {
          const dateA = a.shiftDate ? new Date(a.shiftDate) : new Date();
          const dateB = b.shiftDate ? new Date(b.shiftDate) : new Date();
          return dateB - dateA || 
                 (a.createdAt && b.createdAt ? new Date(b.createdAt) - new Date(a.createdAt) : 0);
        });
        
        console.log(`Sorted ${sortedSubmissions.length} submissions`);
        setHoursSubmissions(sortedSubmissions);
        setMessage("");
        setMessageType("");
      } else {
        console.log("No submissions found in response");
        setHoursSubmissions([]);
        setMessage("No hours submissions found in database.");
        setMessageType("info");
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hours submissions:", error);
      
      let errorMessage = "Network error. Please check your connection.";
      
      if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data?.message || 'Unknown server error'}`;
        console.error("Response error data:", error.response.data);
      } else if (error.request) {
        errorMessage = "No response received from server. Check if the server is running.";
      } else {
        errorMessage = `Request error: ${error.message}`;
      }
      
      setMessage(`Failed to load hours submissions. ${errorMessage}`);
      setMessageType("error");
      setLoading(false);
    }
  };

  const debugState = () => {
    console.log("Current state of hoursSubmissions:", hoursSubmissions);
  };

  const handleRetry = () => {
    console.log("Retrying data fetch...");
    setMessage("");
    fetchHourSubmissions();
  };

  const safeGet = (obj, path, defaultValue = "") => {
    try {
      return path.split('.').reduce((o, key) => (o || {})[key], obj) || defaultValue;
    } catch (e) {
      return defaultValue;
    }
  };

  useEffect(() => {
    console.log("ApproveHours component mounted");
    if (userRole === "admin") {
      console.log("Fetching appointments for admin...");
      fetchHourSubmissions();
    } else {
      // Redirect to home page if the user is not an admin
      navigate("/");
    }
  }, [userRole, navigate]);

  return (
    <div className="approve-hours-page">
      <Navigation />

      <section className="approve-hours">
        <h1>Employee Hours</h1>

        {message && (
          <div className={`message ${messageType === "success" ? "success" : 
                                    messageType === "info" ? "info" : "error"}`}>
            <p>{message}</p>
            {messageType !== "success" && (
              <button onClick={handleRetry} className="retry-btn">
                Retry
              </button>
            )}
          </div>
        )}

        <div className="filter-controls">
          <button onClick={handleRetry} className="refresh-btn">
            Refresh Data
          </button>
          <button onClick={debugState} className="debug-btn" style={{marginLeft: '10px'}}>
            Debug State
          </button>
        </div>

        {loading ? (
          <p className="loading">Loading hours submissions...</p>
        ) : hoursSubmissions.length > 0 ? (
          <table className="hours-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Email</th>
                <th>Shift Date</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Hours Worked</th>
                <th>Status</th>
                <th>Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {hoursSubmissions.map((submission, index) => (
                <tr key={submission._id || index} className={`status-${safeGet(submission, 'status', 'unknown')}`}>
                  <td>{safeGet(submission, 'employeeName')}</td>
                  <td>{safeGet(submission, 'employeeEmail')}</td>
                  <td>{safeGet(submission, 'shiftDate') ? new Date(submission.shiftDate).toLocaleDateString() : 'N/A'}</td>
                  <td>{safeGet(submission, 'clockInTime')}</td>
                  <td>{safeGet(submission, 'clockOutTime')}</td>
                  <td>{safeGet(submission, 'hoursWorked')}</td>
                  <td>
                    <span className={`status-badge ${safeGet(submission, 'status', 'unknown')}`}>
                      {safeGet(submission, 'status', 'Unknown').charAt(0).toUpperCase() + 
                      safeGet(submission, 'status', 'Unknown').slice(1)}
                    </span>
                  </td>
                  <td>{safeGet(submission, 'createdAt') ? new Date(submission.createdAt).toLocaleString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-submissions">
            <p>No hours submissions found.</p>
            <div className="empty-state-info">
              <h3>Troubleshooting Database Connection</h3>
              <p>Your MongoDB has data but the API isn't returning it. Try these steps:</p>
              <ol>
                <li>Check server logs for error messages</li>
                <li>Verify database connection string in your server config</li>
                <li>Inspect API response in browser Network tab (F12)</li>
                <li>Run the debug script to check collection and document structure</li>
                <li>Verify that your model schema matches the database structure</li>
              </ol>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ApproveHours;