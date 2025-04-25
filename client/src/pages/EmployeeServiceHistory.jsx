import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import { UserContext } from "../context/UserContext";

const EmployeeServiceHistory = () => {
  const { userRole } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch appointments completed by the logged-in employee
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/appointments", { withCredentials: true });

      console.log("API Response:", response.data);

      // Extract appointments and loggedInEmployeeId from the response
      const { appointments, loggedInEmployeeId } = response.data;

      // Filter appointments that are assigned to the logged-in employee and are completed
      const completedAppointments = appointments.filter(
        (appointment) =>
          appointment.assignedEmployee === loggedInEmployeeId &&
          appointment.status == "completed"
      ).sort((appointment1, appointment2) => { //sorting the apppointments by date and time so that more recent appointments are at the top
        const a1 = new Date(`${new Date(appointment1.date).toDateString()} ${appointment1.time}`);
        const a2 = new Date(`${new Date(appointment2.date).toDateString()} ${appointment2.time}`);
        return a2 - a1;
      });
      
      setAppointments(completedAppointments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setMessage("Failed to load appointments. Please try again.");
      setMessageType("error");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole === "employee") {
      console.log("Fetching appointments for employee...");
      fetchAppointments();
    } else {
      // Redirect to home page if the user is not an employee
      navigate("/");
    }
  }, [userRole, navigate]);

  return (
    <div className="employee-service-history-page">
      <Navigation />

      <section className="employee-service-history">
        <h1>Employee Service History</h1>
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
                <th>Date</th>
                <th>Time</th>
                <th>Customer</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.service}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.user.name}</td>
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

export default EmployeeServiceHistory;