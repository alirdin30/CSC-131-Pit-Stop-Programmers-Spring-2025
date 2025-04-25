import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const Services = () => {
  const [selectedService, setSelectedService] = useState("");
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/services')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch services');
        return res.json();
      })
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle service selection and navigate to appointment scheduling
  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    const selectedServiceObj = services.find(service => service.id === serviceId);
    navigate("/schedule-appointment", { state: { service: selectedServiceObj } });
  };

  if (loading) return (
    <div className="services-page">
      <Navigation />
      <h1>Services Offered</h1>
      <p>Loading...</p>
    </div>
  );
  if (error) return (
    <div className="services-page">
      <Navigation />
      <h1>Services Offered</h1>
      <p style={{color:'red'}}>{error}</p>
    </div>
  );

  return (
    <div className="services-page">
      <Navigation />
      <h1>Services Offered</h1>
      <div className="services-container">
        {services.map((service) => (
          <div 
            key={service._id} 
            className="service-item"
            onClick={() => handleServiceSelect(service._id)}
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
