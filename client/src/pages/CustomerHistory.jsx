import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";

const CustomerHistory = () => {
  const [serviceHistory, setServiceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServiceHistory = async () => {
      try {
        const response = await axios.get("/api/appointments", {
          withCredentials: true,
        });

        // Filter appointments for the logged-in customer
        const customerAppointments = response.data.appointments.filter(
          (appointment) =>
            appointment.status === "completed" ||
            appointment.status === "pending" ||
            appointment.status === "assigned"
        );

        setServiceHistory(customerAppointments);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching service history:", err);
        setError("Failed to load service history. Please try again.");
        setLoading(false);
      }
    };

    fetchServiceHistory();
  }, []);

  return (
    <div className="customer-history-page">
      <Navigation />
      <h1>Service History</h1>

      <section className="history-box">
        {loading ? (
          <p>Loading service history...</p>
        ) : error ? (
          <p className="errorMessage">{error}</p>
        ) : serviceHistory.length > 0 ? (
          serviceHistory.map((service, index) => (
            <div key={index} className="history-item">
              <p>Service: {service.service}</p>
              <p>Date: {new Date(service.date).toLocaleDateString()} @ {service.time}</p>
              <p>Status: {service.status}</p>
            </div>
          ))
        ) : (
          <p>No service history found.</p>
        )}
      </section>
    </div>
  );
};

export default CustomerHistory;