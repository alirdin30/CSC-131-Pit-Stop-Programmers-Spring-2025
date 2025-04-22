import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import { UserContext } from "../context/UserContext";

const AssignedAppointments = () => {
  const { userRole } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch appointments assigned to the logged-in employee
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/appointments", { withCredentials: true });

      console.log("API Response:", response.data);

      // Extract appointments and loggedInEmployeeId from the response
      const { appointments, loggedInEmployeeId } = response.data;

      // Filter appointments assigned to the logged-in employee and not completed
      const assignedAppointments = appointments.filter(
        (appointment) =>
          appointment.assignedEmployee?._id === loggedInEmployeeId &&
          appointment.status !== "completed"
      ).sort((appointment1, appointment2) => { //sorting the apppointments by date and time so that more urgent appointments are at the top
        const a1 = new Date(`${new Date(appointment1.date).toDateString()} ${appointment1.time}`);
        const a2 = new Date(`${new Date(appointment2.date).toDateString()} ${appointment2.time}`);
        return a1 - a2;
      });

      setAppointments(assignedAppointments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setMessage("Failed to load appointments. Please try again.");
      setMessageType("error");
      setLoading(false);
    }
  };

  // Mark an appointment as completed
  const markAsCompleted = async (appointmentId) => {
    try {
      await axios.put(`/api/appointments/${appointmentId}`, { status: "completed" }, { withCredentials: true });

      // Update the specific appointment's status in the state
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: "completed" }
            : appointment
        )
      );

      // Set success message
      setMessage("Appointment marked as completed.");
      setMessageType("success");
    } catch (error) {
      console.error("Error marking appointment as completed:", error.response?.data || error.message);
      setMessage("Failed to update appointment status. Please try again.");
      setMessageType("error");
    }
  };

  useEffect(() => {
    if (userRole === "employee") {
      fetchAppointments();
    } else {
      // Redirect to home page if the user is not an employee
      navigate("/");
    }
  }, [userRole, navigate]);

  return (
    <div className="assigned-appointments-page">
      <Navigation />

      <section className="assigned-appointments">
        <h1>Pending Services</h1>
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
                  <td>{appointment.user.name}</td>
                  <td>
                    {appointment.status === "completed" ? (
                      <span>Completed</span>
                    ) : (
                      <button
                        className="complete-button"
                        onClick={() => markAsCompleted(appointment._id)}
                      >
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No assigned appointments found.</p>
        )}
      </section>
    </div>
  );
};

export default AssignedAppointments;