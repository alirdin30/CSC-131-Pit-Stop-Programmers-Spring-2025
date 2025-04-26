import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ApprovedHours() {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    fetchHours();
  }, []);

  const fetchHours = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/hoursSubmitted');
      setHours(response.data);
    } catch (error) {
      console.error('Error fetching submitted hours:', error);
    }
  };

  return (
    <div className="approved-hours-container">
      <h2>Approved Hours</h2>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Shift Date</th>
            <th>Clock In Time</th>
            <th>Clock Out Time</th>
            <th>Hours Worked</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {hours.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.employeeName}</td>
              <td>{entry.employeeEmail}</td>
              <td>{new Date(entry.shiftDate).toLocaleDateString()}</td>
              <td>{new Date(entry.clockInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
              <td>{new Date(entry.clockOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
              <td>{entry.hoursWorked}</td>
              <td>{entry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApprovedHours;
