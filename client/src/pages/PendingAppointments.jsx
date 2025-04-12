import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import { UserContext } from "../context/UserContext";

const PendingAppointments = () => {
  const { userRole } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch unassigned appointments with status "pending"
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/appointments", { withCredentials: true });

      console.log("API Response:", response.data);

      // Extract appointments from the response
      const { appointments } = response.data;

      // Filter appointments that are not assigned and have a status of "pending"
      const unassignedAppointments = appointments.filter(
        (appointment) => appointment.status === "pending"
      );

      setAppointments(unassignedAppointments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setMessage("Failed to load appointments. Please try again.");
      setMessageType("error");
      setLoading(false);
    }
  };

  // Assign the logged-in employee to an appointment
  const assignToAppointment = async (appointmentId) => {
    try {
      await axios.put(
        `/api/appointments/${appointmentId}/assign`,
        { assignedEmployee: "self" }, // Backend will replace "self" with the logged-in employee's ID
        { withCredentials: true }
      );

      // Update the specific appointment's status in the state
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: "assigned" }
            : appointment
        )
      );

      // Set success message
      setMessage("You have been assigned to the appointment.");
      setMessageType("success");
    } catch (error) {
      console.error("Error assigning to appointment:", error);
      setMessage("Failed to assign yourself to the appointment. Please try again.");
      setMessageType("error");
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
    <div className="pending-appointments-page">
      <Navigation />

      <section className="pending-appointments">
        <h1>Pending Appointments</h1>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.service}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.user.name || "N/A"}</td>
                  <td>
                    {appointment.status === "assigned" ? (
                      <span>Assigned</span>
                    ) : (
                      <button
                        className="assign-button"
                        onClick={() => assignToAppointment(appointment._id)}
                      >
                        Assign to Me
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No pending appointments found.</p>
        )}
      </section>
    </div>
  );
};

export default PendingAppointments;