import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import axios from "axios";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || !location.state.service || !location.state.date || !location.state.time) {
      navigate("/schedule-appointment"); 
    }
  }, [location, navigate]);

  const service = location.state?.service || "";
  const date = location.state?.date || "";
  const time = location.state?.time || "";

  return (
    <div className="confirmation-page">
      <Navigation />
        
      <div className="confirmation-page-box">
        <h1>Appointment Confirmation</h1>
        <p className="confirmation-message">
          Hello, your appointment for {service} is set for {date} at {time}.
        </p>

        <p className="confirmation-message">
          Thank you for choosing Pit Stop Programmers! We look forward to serving you.
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
