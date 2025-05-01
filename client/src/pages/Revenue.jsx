import Navigation from "../components/Navigation";
import axios from "axios";
import { useState, useEffect } from "react";

const Revenue = () => {
  const [serviceRevenue, setServiceRevenue] = useState([]);

  const fetchServiceRevenue = async () => {
    try {
      const response = await axios.get("/api/appointments/service-revenue", { withCredentials: true });
      setServiceRevenue(response.data);
    } catch (error) {
      console.error("Error fetching service revenue:", error.message);
    }
  };

  useEffect(() => {
    fetchServiceRevenue();
  }, []);

  return (
    <div className="revenue-page">
      <Navigation />
      <h1>Total Revenue</h1>

      <section className="revenue-summary">
        {serviceRevenue.length > 0 ? (
          serviceRevenue.map((service, index) => (
            <div key={index} className="revenue-item">
              <h3>{service._id}</h3>
              <p>Amount Sold: {service.count}</p>
              <p>Price: ${service.price.toFixed(2)}</p>
              <p>Total Revenue: ${service.revenue.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No revenue data available.</p>
        )}
      </section>
    </div>
  );
};

export default Revenue;