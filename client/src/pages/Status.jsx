import Navigation from "../components/Navigation";
import axios from 'axios';
import { useState, useEffect } from 'react';

const Status = () => {
  const [latestStatus, setLatestStatus] = useState(null);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointments', { withCredentials: true });
      console.log('Appointments:', response.data);

      const { appointments, loggedInEmployeeId } = response.data;

      // Filter appointments for the logged-in user
      const customerAppointments = appointments.filter(
        (appointment) => appointment.user._id === loggedInEmployeeId
      );

      // Sort appointments by date (most recent first) and get the latest one
      const latestAppointment = customerAppointments.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )[0];

      // Set the latest appointment's status
      if (latestAppointment) {
        setLatestStatus(
          latestAppointment.status.charAt(0).toUpperCase() + latestAppointment.status.slice(1)
        );
      } else {
        setLatestStatus(null);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="status-page">
      <Navigation />
      <h1>Car Status</h1>

      <section className="status-section">
        {latestStatus ? (
          <p>Status: {latestStatus}</p>
        ) : (
          <p>No active appointments available.</p>
        )}
      </section>
    </div>
  );
};

export default Status;