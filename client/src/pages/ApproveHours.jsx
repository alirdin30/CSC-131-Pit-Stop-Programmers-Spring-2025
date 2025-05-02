import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import { UserContext } from "../context/UserContext";
import "../App.css"; // Import the App.css file

const ApproveHours = () => {
  const { userRole } = useContext(UserContext);
  const [hoursSubmissions, setHoursSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState([]); // Track submissions being processed
  const [statusFilter, setStatusFilter] = useState("All"); // Filter state: All, Pending, Approved, Rejected
  const navigate = useNavigate();

  // Fetch hours submissions
  const fetchHourSubmissions = async () => {
    try {
      setLoading(true);
      
      const response = await axios.get("/api/hoursSubmitted", { 
        withCredentials: true,
        timeout: 15000,  // Increased timeout
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      let submissions = [];
      
      if (Array.isArray(response.data) && response.data.length > 0) {
        submissions = response.data;
      } else if (response.data && Array.isArray(response.data.hours)) {
        submissions = response.data.hours;
      } else if (response.data && typeof response.data === 'object') {
        // If we get a single object, put it in an array
        submissions = [response.data];
      }
      
      if (submissions.length > 0) {
        // Normalize the status values to be consistent
        const normalizedSubmissions = submissions.map(submission => {
          let normalizedStatus = submission.status;
          
          // Normalize status to make sure we're using "Rejected" consistently
          if (normalizedStatus === "denied" || normalizedStatus === "Denied") {
            normalizedStatus = "Rejected";
          } else if (normalizedStatus === "approved") {
            normalizedStatus = "Approved";
          } else if (normalizedStatus === "pending") {
            normalizedStatus = "Pending";
          }
          
          return {
            ...submission,
            status: normalizedStatus
          };
        });
        
        const sortedSubmissions = [...normalizedSubmissions].sort((a, b) => {
          const dateA = a.shiftDate ? new Date(a.shiftDate) : new Date();
          const dateB = b.shiftDate ? new Date(b.shiftDate) : new Date();
          return dateB - dateA || 
                 (a.createdAt && b.createdAt ? new Date(b.createdAt) - new Date(a.createdAt) : 0);
        });
        
        setHoursSubmissions(sortedSubmissions);
        // Apply current filter to the new data
        applyStatusFilter(sortedSubmissions, statusFilter);
        setMessage("");
        setMessageType("");
      } else {
        setHoursSubmissions([]);
        setMessage("No hours submissions found in database.");
        setMessageType("info");
      }
      
      setLoading(false);
    } catch (error) {
      let errorMessage = "Network error. Please check your connection.";
      
      if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data?.message || 'Unknown server error'}`;
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

  // Function to update the status (approve or deny)
  const updateStatus = async (submissionId, newStatus) => {
    // Don't proceed if this submission is already being processed
    if (processingIds.includes(submissionId)) {
      return;
    }

    // Add this submission to the processing list
    setProcessingIds(prev => [...prev, submissionId]);
    
    try {
      // Map frontend status terms to backend API values
      const statusMap = {
        'Approved': 'approved',
        'Rejected': 'denied'
      };
      
      // For API call, use lowercase status values
      const apiStatus = statusMap[newStatus];
      console.log(`Updating status for submission ${submissionId} to ${apiStatus}`);
      
      const response = await axios.put(`/api/hoursSubmitted/${submissionId}`, 
        { status: apiStatus },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      
      if (response.status === 200 || response.status === 201) {
        // Update the local state to reflect the change
        const updatedSubmissions = hoursSubmissions.map(submission => 
          submission._id === submissionId 
            ? { ...submission, status: newStatus } 
            : submission
        );
        
        setHoursSubmissions(updatedSubmissions);
        // Re-apply the current filter with the updated data
        applyStatusFilter(updatedSubmissions, statusFilter);
        
        setMessage(`Successfully ${newStatus === 'Approved' ? 'approved' : 'rejected'} hours submission.`);
        setMessageType("success");
        
        // Clear the message after 3 seconds
        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 3000);
      }
    } catch (error) {
      let errorMessage = "Network error. Please check your connection.";
      
      if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data?.message || 'Unknown server error'}`;
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        errorMessage = "No response received from server. Check if the server is running.";
      } else {
        errorMessage = `Request error: ${error.message}`;
      }
      
      setMessage(`Failed to update submission status. ${errorMessage}`);
      setMessageType("error");
    } finally {
      // Remove this submission from the processing list
      setProcessingIds(prev => prev.filter(id => id !== submissionId));
    }
  };

  const handleRetry = () => {
    setMessage("");
    fetchHourSubmissions();
  };
  
  // Function to filter submissions by status
  const applyStatusFilter = (submissions, filter) => {
    if (filter === "All") {
      setFilteredSubmissions(submissions);
    } else {
      const filtered = submissions.filter(submission => 
        safeGet(submission, 'status', 'Pending') === filter
      );
      setFilteredSubmissions(filtered);
    }
  };
  
  // Handle status filter change
  const handleFilterChange = (filter) => {
    setStatusFilter(filter);
    applyStatusFilter(hoursSubmissions, filter);
  };

  const safeGet = (obj, path, defaultValue = "") => {
    try {
      return path.split('.').reduce((o, key) => (o || {})[key], obj) || defaultValue;
    } catch (e) {
      return defaultValue;
    }
  };

  useEffect(() => {
    if (userRole === "admin") {
      fetchHourSubmissions();
    } else {
      // Redirect to home page if the user is not an admin
      navigate("/");
    }
  }, [userRole, navigate]);
  
  // Initialize filtered submissions when hoursSubmissions changes
  useEffect(() => {
    applyStatusFilter(hoursSubmissions, statusFilter);
  }, [hoursSubmissions]);

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
          
          <div className="status-filter">
            <label htmlFor="status-select">Filter by status: </label>
            <select 
              id="status-select"
              value={statusFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="status-select"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="loading">Loading hours submissions...</p>
        ) : filteredSubmissions.length > 0 ? (
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission, index) => {
                // Get status and normalize it for display consistency
                const status = safeGet(submission, 'status', 'Pending');
                
                return (
                  <tr key={submission._id || index} className={`status-${status.toLowerCase()}`}>
                    <td>{safeGet(submission, 'employeeName')}</td>
                    <td>{safeGet(submission, 'employeeEmail')}</td>
                    <td>{safeGet(submission, 'shiftDate') ? new Date(submission.shiftDate).toLocaleDateString() : 'N/A'}</td>
                    <td>{safeGet(submission, 'clockInTime')}</td>
                    <td>{safeGet(submission, 'clockOutTime')}</td>
                    <td>{safeGet(submission, 'hoursWorked')}</td>
                    <td>
                      <span className={`status-badge ${status.toLowerCase()}`}>
                        {status}
                      </span>
                    </td>
                    <td>{safeGet(submission, 'createdAt') ? new Date(submission.createdAt).toLocaleString() : 'N/A'}</td>
                    <td className="action-buttons">
                      {status !== 'Approved' && (
                        <button 
                          onClick={() => updateStatus(submission._id, 'Approved')}
                          className="approve-btn"
                          disabled={processingIds.includes(submission._id)}
                        >
                          {processingIds.includes(submission._id) ? 'Processing...' : 'Approve'}
                        </button>
                      )}
                      {status !== 'Rejected' && (
                        <button 
                          onClick={() => updateStatus(submission._id, 'Rejected')}
                          className="deny-btn"
                          disabled={processingIds.includes(submission._id)}
                        >
                          {processingIds.includes(submission._id) ? 'Processing...' : 'Deny'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : hoursSubmissions.length > 0 ? (
          <div className="no-submissions">
            <p>No submissions match the selected filter: {statusFilter}</p>
          </div>
        ) : (
          <div className="no-submissions">
            <p>No hours submissions found.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ApproveHours;