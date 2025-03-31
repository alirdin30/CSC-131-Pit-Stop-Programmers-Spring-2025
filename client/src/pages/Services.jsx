import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const Services = () => {
  const [selectedService, setSelectedService] = useState("");
  const navigate = useNavigate();

  // Available services with their details
  const services = [
    { id: "oil-change", name: "Oil Change", price: "$39.99", description: "Regular oil changes are essential for maintaining your engine's performance and longevity." },
    { id: "tire-rotation", name: "Tire Rotation and Balancing", price: "$49.99", description: "Ensure even tire wear and optimal vehicle handling with our tire services." },
    { id: "brake-service", name: "Brake Service", price: "$89.99", description: "Safety is our priority. Our comprehensive brake service ensures your vehicle stops reliably." },
    { id: "engine-diagnostics", name: "Engine Diagnostics", price: "$79.99", description: "Using state-of-the-art equipment, we can diagnose and troubleshoot engine issues." },
    { id: "transmission-service", name: "Transmission Service", price: "$129.99", description: "Keep your transmission running smoothly with our expert maintenance service." },
    { id: "battery-replacement", name: "Battery Replacement", price: "$99.99", description: "Don't get stranded with a dead battery. We offer testing and replacement services." }
  ];

  // Handle service selection and navigate to appointment scheduling
  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    const selectedServiceObj = services.find(service => service.id === serviceId);
    navigate("/schedule-appointment", { state: { service: selectedServiceObj } });
  };

  return (
    <div className="services-page">
      <Navigation />

      <h1>Services Offered</h1>
      
      <div className="services-container">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="service-item"
            onClick={() => handleServiceSelect(service.id)}
          >
            <h3 className="service-title">{service.name}</h3>
            <p className="service-description">{service.description}</p>
            <p className="service-price">Price: {service.price}</p>
            <button className="schedule-button">Schedule Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
