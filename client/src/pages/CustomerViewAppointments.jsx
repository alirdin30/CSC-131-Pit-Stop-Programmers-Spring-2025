import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import { UserContext } from "../context/UserContext";

const CustomerHistory = () => {
  const { userRole } = useContext(UserContext);
  const [appointments, setServiceHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //Fetch all past appointments of the logged-in customer
  const fetchServiceHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/appointments", { withCredentials: true });

      console.log("API Response:", response.data);

      // Extract appointments and loggedInUserId from the response
      const { appointments, loggedInUserId } = response.data;

      // Filter upcoming appointments for the logged-in customer
      const customerAppointments = appointments.filter(
        (appointment) =>
          appointment.user._id === loggedInUserId &&
          appointment.status !== "completed" &&
          appointment.status !== "cancelled"
      ).sort((appointment1, appointment2) => { //sorting the apppointments by date and time so that more recent appointments are at the top
        const a1 = new Date(`${new Date(appointment1.date).toDateString()} ${appointment1.time}`);
        const a2 = new Date(`${new Date(appointment2.date).toDateString()} ${appointment2.time}`);
        return a2 - a1;
      });

      setServiceHistory(customerAppointments);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching service history:", err);
      setMessage("Failed to load service history. Please try again.");
      setMessageType("error");
      setLoading(false);
    }
  };

  // Mark an appointment as cancelled
  const markAsCancelled = async (appointmentId) => {
    try {
      await axios.put(`/api/appointments/${appointmentId}`, { status: "cancelled" }, { withCredentials: true });

      // Update the specific appointment's status in the state
      setServiceHistory((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: "cancelled" }
            : appointment
        )
      );

      // Set success message
      setMessage("Appointment marked as cancelled.");
      setMessageType("success");
    } catch (error) {
      console.error("Error marking appointment as cancelled:", error.response?.data || error.message);
      setMessage("Failed to update appointment status. Please try again.");
      setMessageType("error");
    }
  };

  useEffect(() => {
    if (userRole === "customer") {
      console.log("Fetching past appointments for customer...");
      fetchServiceHistory();
    } else {
      // Redirect to home page if the user is not an admin
      navigate("/");
    }
  }, [userRole, navigate]);

  return (
    <div className="customer-history-page">
      <Navigation />

      <section className="customer-history">
        <h1>View Appointments</h1>
        {message && (
          <p className={`message ${messageType === "success" ? "success" : "error"}`}>
            {message}
          </p>
        )}
        {loading ? (
          <p>Loading past appointments...</p>
        ) : appointments.length > 0 ? (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Car</th>
                <th>Date</th>
                <th>Time</th>
                <th>Mechanic</th>
                <th>Actions</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.service}</td>
                  <td>{appointment.carYear + " " + appointment.carMake + " " + appointment.carModel}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.assignedEmployee?.name || "Unassigned"}</td>
                  <td>
                    {appointment.status === "cancelled" ? (
                      <span>Cancelled</span>
                    ) : (
                      <button
                        className="cancel-button"
                        onClick={() => markAsCancelled(appointment._id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                  <td>{appointment.notes || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No past appointments found.</p>
        )}
      </section>
    </div>
  );
};

export default CustomerHistory;