import Navigation from "../components/Navigation";
import axios from "axios";
import { useState, useEffect } from "react";

// Import images directly
import progressComplete from "../assets/progressbar/progresscomplete.png";
import progressDefault from "../assets/progressbar/progressdefault.png";
import progressHalf from "../assets/progressbar/progresshalf.png";
import progressQuarter from "../assets/progressbar/progressquarter.png";
import progressThreeQuarters from "../assets/progressbar/progress3quarter.png";

const Status = () => {
  const [latestAppointment, setLatestAppointment] = useState(null);


  // Map statuses to imported image URLs
  // Remeber to add more images when more statuses are added
  const statusImages = {
    Completed: progressComplete,
    Assigned: progressQuarter,
    default: progressDefault, // Fallback image
  };

  // I based the statuses on what statuses are in the 
  // appointment model which are "completed" and "assigned"
  // pending statuses should not be shown

  // Messages for each status
  const statusMessages = {
    Completed: "The work on your car is done. you can now pick up your car.",
    Assigned: "Your car has been checked in.",
    default: "", // Fallback image
  };
  

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/api/appointments", { withCredentials: true });
      console.log("Appointments:", response.data);

      const { appointments, loggedInUserId } = response.data;

      // Filter appointments for the logged-in user and exclude "pending" statuses
      const customerAppointments = appointments.filter(
        (appointment) =>
          appointment.user._id === loggedInUserId && appointment.status !== "pending"
      );

      // Sort appointments by date (most recent first) and get the latest one
      const latest = customerAppointments.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )[0];

      // Set the latest appointment details
      if (latest) {
        setLatestAppointment({
          status: latest.status.charAt(0).toUpperCase() + latest.status.slice(1),
          service: latest.service,
          carDetails: `${latest.carYear} ${latest.carMake} ${latest.carModel}`,
          date: new Date(latest.date).toLocaleDateString(),
          time: latest.time,
        });
      } else {
        setLatestAppointment(null);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
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
        {latestAppointment ? (
          <>
            <p>Status: {latestAppointment.status} - {statusMessages[latestAppointment.status]}</p>
            <p>Service: {latestAppointment.service}</p>
            <p>Car: {latestAppointment.carDetails}</p>
            <p>Date: {latestAppointment.date}</p>
            <p>Time: {latestAppointment.time}</p>
            <img
              src={statusImages[latestAppointment.status] || statusImages.default}
              alt={latestAppointment.status}
              className="status-image"
            />
          </>
        ) : (
          <p>No active appointments available.</p>
        )}
      </section>
    </div>
  );
};

export default Status;