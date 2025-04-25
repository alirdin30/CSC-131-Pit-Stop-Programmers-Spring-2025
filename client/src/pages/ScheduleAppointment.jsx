import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "../components/Navigation";

const ScheduleAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  useEffect(() => {
    if (location.state && location.state.service) {
      setSelectedService(location.state.service);
    } else {
      navigate("/services");
    }
  }, [location, navigate]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/auth/status", { withCredentials: true });
        setIsLoggedIn(response.status === 200);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!appointmentDate) {
      setError("Please select a date");
      return;
    }

    if (!appointmentTime) {
      setError("Please select a time");
      return;
    }

    if (!carYear || !carMake || !carModel) {
      setError("Please provide year, make, and model of the car");
      return;
    }

    if (!isLoggedIn) {
      setError("Please log in to schedule an appointment");
      setTimeout(() => {
        navigate("/login", { state: { returnTo: "/schedule-appointment", service: selectedService } });
      }, 3000);
      return;
    }

    try {
      const formattedDate = appointmentDate.toISOString().split('T')[0];
      const response = await axios.post("/api/appointments", {
        service: selectedService.name,
        date: formattedDate,
        time: appointmentTime,
        carYear,
        carMake,
        carModel
      }, { withCredentials: true });

      setMessage("Appointment scheduled successfully!");
      setAppointmentDate(null);
      setAppointmentTime("");
      setCarYear("");
      setCarMake("");
      setCarModel("");

      setTimeout(() => {
        navigate("/Confirmation", {
          state: {
            service: selectedService.name,
            date: formattedDate,
            time: appointmentTime
          }
        });
      }, 3000);
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      if (error.response?.status === 401) {
        setError("You must be logged in to schedule an appointment. Redirecting to login...");
        setTimeout(() => {
          navigate("/login", { state: { returnTo: "/schedule-appointment", service: selectedService } });
        }, 2000);
      } else {
        setError(error.response?.data?.message || "Error scheduling appointment. Please try again.");
      }
    }
  };

  const today = new Date();
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  if (!selectedService) {
    return <div>Loading...</div>;
  }

  return (
    <div className="schedule-page">
      <Navigation />

      <div className="schedule-container">
        <h1>Schedule an Appointment</h1>

        <div className="selected-service-details">
          <h2>{selectedService.name}</h2>
          <p className="service-description">{selectedService.description}</p>
          <p className="service-price">Price: {selectedService.price}</p>
        </div>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-group">
            <label htmlFor="appointment-date">Appointment Date:</label>
            <DatePicker
              selected={appointmentDate}
              onChange={date => setAppointmentDate(date)}
              minDate={today}
              filterDate={isWeekday}
              placeholderText="Select a date"
              className="date-picker"
              dateFormat="MMMM d, yyyy"
              showPopperArrow={false}
              id="appointment-date"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="appointment-time">Appointment Time:</label>
            <select
              id="appointment-time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            >
              <option value="">Select a time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="car-year">Car Year:</label>
            <input
              type="text"
              id="car-year"
              value={carYear}
              onChange={(e) => setCarYear(e.target.value)}
              placeholder="e.g. 2018"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="car-make">Car Make:</label>
            <input
              type="text"
              id="car-make"
              value={carMake}
              onChange={(e) => setCarMake(e.target.value)}
              placeholder="e.g. Toyota"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="car-model">Car Model:</label>
            <input
              type="text"
              id="car-model"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              placeholder="e.g. Camry"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate("/services")}>
              Cancel
            </button>
            <button type="submit" className="schedule-button">
              Schedule Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleAppointment;
