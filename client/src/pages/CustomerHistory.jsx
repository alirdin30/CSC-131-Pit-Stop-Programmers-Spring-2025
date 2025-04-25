import Navigation from "../components/Navigation";
import axios from 'axios';
import { useState, useEffect } from 'react';

const CustomerHistory = () => {
  const [serviceHistory, setServiceHistory] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointments', { withCredentials: true });
      console.log('Appointments:', response.data);

      const { appointments, loggedInEmployeeId } = response.data;

      // Filter appointments for the logged-in user
      const customerAppointments = appointments.filter(
        (appointment) => appointment.user._id === loggedInEmployeeId
      );

      // Map the filtered appointments to match the table structure
      const formattedAppointments = customerAppointments.map((appointment) => ({
        service: appointment.service,
        date: new Date(appointment.date).toLocaleDateString(),
        time: appointment.time,
        status: appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1),
      }));

      setServiceHistory(formattedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="customer-history-page">
      <Navigation />
      <h1>Service History</h1>

      <table className="customer-history-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {serviceHistory.length > 0 ? (
            serviceHistory.map((history, index) => (
              <tr key={index}>
                <td>{history.service}</td>
                <td>{history.date}</td>
                <td>{history.time}</td>
                <td>{history.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No service history available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerHistory;