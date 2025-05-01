import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import { UserContext } from "../context/UserContext";

const AdminServiceHistory = () => {
  const { userRole } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch appointments completed by any of the admin's employees
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/appointments", { withCredentials: true });

      console.log("API Response:", response.data);

      // Extract appointments from the response
      const { appointments } = response.data;

      // Sort all appointments by most recent
      // Admin should be able to see all appointments, regardless of their status, so we don't put in a .filter() here
      const sortedAppointments = appointments.sort((appointment1, appointment2) => { //sorting the apppointments by date and time so that more recent appointments are at the top
        const a1 = new Date(`${new Date(appointment1.date).toDateString()} ${appointment1.time}`);
        const a2 = new Date(`${new Date(appointment2.date).toDateString()} ${appointment2.time}`);
        return a2 - a1;
      });
      
      setAppointments(sortedAppointments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setMessage("Failed to load appointments. Please try again.");
      setMessageType("error");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole === "admin") {
      console.log("Fetching appointments for admin...");
      fetchAppointments();
    } else {
      // Redirect to home page if the user is not an admin
      navigate("/");
    }
  }, [userRole, navigate]);

  return (
    <div className="admin-service-history-page">
      <Navigation />

      <section className="admin-service-history">
        <h1>Admin Service History</h1>
        {message && (
          <p className={`message ${messageType === "success" ? "success" : "error"}`}>
            {message}
          </p>
        )}
        {loading ? (
          <p>Loading appointments...</p>
        ) : appointments.length > 0 ? (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Car</th>
                <th>Date</th>
                <th>Time</th>
                <th>Customer</th>
                <th>Employee</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.service}</td>
                  <td>{appointment.carYear + " " + appointment.carMake + " " + appointment.carModel}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.user.name}</td>
                  <td>{appointment.assignedEmployee?.name || "Unassigned"}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No previous appointments found.</p>
        )}
      </section>
    </div>
  );
};

export default AdminServiceHistory;