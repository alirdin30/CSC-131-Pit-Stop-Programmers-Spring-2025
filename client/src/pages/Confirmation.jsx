import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import axios from "axios";

const Confirmation = () => {
  const user = useContext(UserContext);
  const [username, setUsername] = useState(user?.username || "Guest");
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch username if not available in context (in case of refresh)
  useEffect(() => {
    if (!user?.username) {
      const fetchUser = async () => {
        try {
          const response = await axios.get("/api/auth/status", { withCredentials: true });
          if (response.data.user) {
            setUsername(response.data.user.username);
          }
        } catch (error) {
          setUsername("Guest");
        }
      };
      fetchUser();
    }
  }, [user]);

  // Ensure location.state exists before accessing its properties
  useEffect(() => {
    if (!location.state || !location.state.service || !location.state.date || !location.state.time) {
      navigate("/schedule-appointment"); // Redirect if state is missing
    }
  }, [location, navigate]);

  // Extract appointment details, default to empty string to prevent "undefined"
  const service = location.state?.service || "";
  const date = location.state?.date || "";
  const time = location.state?.time || "";

  return (
    <div className="confirmation-page">
      <Navigation />
        
      <div className="confirmation-page-box">
        <h1>Appointment Confirmation</h1>
        <p>
          Hello, your appointment for {service} is set for {date} at {time}.
        </p>

        <p>Thank you for choosing Pit Stop Programmers! We look forward to serving you.</p>
      </div>
    </div>
  );
};

export default Confirmation;
