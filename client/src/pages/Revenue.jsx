import Navigation from "../components/Navigation";

// get sales from the database
var oilsold = 0;
var tiresold = 0;
var brakesold = 0;
var enginesold = 0;
var transmissionsold = 0;
var batterysold = 0;

// prices are currently hardcoded
const servicenames = [
  { name: "Oil Change Sales", sold: oilsold, revenue: oilsold * 39.99},
  { name: "Tire Rotation Sales", sold: tiresold , revenue: tiresold * 49.99},
  { name: "Brake Service Sales", sold: brakesold, revenue: brakesold * 89.99},
  { name: "Engine Diagnostics Sales",sold: enginesold , revenue: enginesold * 79.99},
  { name: "Transmission Services Sales",sold: transmissionsold, revenue: transmissionsold * 129.99},
  { name: "Battery Replacement Sales", sold: batterysold, revenue: batterysold * 99.99},
];

const Revenue = () => {
  return (
    <div className="revenue-page">
    <Navigation />
    <h1>Total Revenue</h1>

    <section className="revenue-summary">
      {servicenames.map((service, index) => (
        <div key={index} className="revenue-item">
          <h3>{service.name}</h3>
          <p>Amount Sold: {service.sold}</p>
          <p>Total Revenue: ${service.revenue}</p>
        </div>
      ))}
      </section>
  </div>
  );
};

export default Revenue;