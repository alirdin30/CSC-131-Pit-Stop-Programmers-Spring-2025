import Navigation from "../components/Navigation";

const Services = () => {
  return (
    <div className="services-page">
      <Navigation />

      <h1>Services Offered</h1>
      
      <div className="services-container">
        <div className="service-item">
          <h3>Oil Change</h3>
          <p>Regular oil changes are essential for maintaining your engine's performance and longevity.</p>
          <p>Price: Starting at $39.99</p>
        </div>

        <div className="service-item">
          <h3>Tire Rotation and Balancing</h3>
          <p>Ensure even tire wear and optimal vehicle handling with our tire services.</p>
          <p>Price: Starting at $49.99</p>
        </div>

        <div className="service-item">
          <h3>Brake Service</h3>
          <p>Safety is our priority. Our comprehensive brake service ensures your vehicle stops reliably.</p>
          <p>Price: Starting at $89.99</p>
        </div>

        <div className="service-item">
          <h3>Engine Diagnostics</h3>
          <p>Using state-of-the-art equipment, we can diagnose and troubleshoot engine issues.</p>
          <p>Price: Starting at $79.99</p>
        </div>

        <div className="service-item">
          <h3>Transmission Service</h3>
          <p>Keep your transmission running smoothly with our expert maintenance service.</p>
          <p>Price: Starting at $129.99</p>
        </div>

        <div className="service-item">
          <h3>Battery Replacement</h3>
          <p>Don't get stranded with a dead battery. We offer testing and replacement services.</p>
          <p>Price: Starting at $99.99</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
