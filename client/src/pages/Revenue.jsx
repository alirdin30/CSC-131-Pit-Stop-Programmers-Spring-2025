import Navigation from "../components/Navigation";
import axios from "axios";
import { useState, useEffect } from "react";

const Revenue = () => {
  const [serviceCounts, setServiceCounts] = useState([]);

  const fetchServiceCounts = async () => {
    try {
      const response = await axios.get("/api/appointments/service-count", { withCredentials: true });
      setServiceCounts(response.data);
    } catch (error) {
      console.error("Error fetching service counts:", error.message);
    }
  };

  useEffect(() => {
    fetchServiceCounts();
  }, []);

  return (
    <div className="revenue-page">
      <Navigation />
      <h1>Total Revenue</h1>

      <section className="revenue-summary">
        {serviceCounts.length > 0 ? (
          serviceCounts.map((service, index) => (
            <div key={index} className="revenue-item">
              <h3>{service._id}</h3>
              <p>Amount Sold: {service.count}</p>
            </div>
          ))
        ) : (
          <p>No sales data available.</p>
        )}
      </section>
    </div>
  );
};

export default Revenue;