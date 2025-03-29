import Navigation from "../components/Navigation";

const servicenames = [
  { name: "Oil Change Sales" },
  { name: "Tire Rotation Sales" },
  { name: "Brake Service Sales" },
  { name: "Engine Diagnostics Sales" },
  { name: "Transmission Services Sales" },
  { name: "Battery Replacement Sales" },
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
          <p>Amount Sold: </p>
          <p>Total Revenue: $XXXX</p>
          <p>Total Cost: $XXXX</p>
          <p>Total Profit: $XXXX</p>
        </div>
      ))}
      </section>
  </div>
  );
};

export default Revenue;