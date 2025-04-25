import Navigation from "../components/Navigation";

// get service history from database
var serviceDone = "Oil Change";
var dateHistory = "1-2-2025";
var timeHistory = "10:00 AM";
var statusHistory = "Complete";

const serviceHistory = [
  { service: serviceDone, date: dateHistory, time: timeHistory, status: statusHistory},
];

const CustomerHistory = () => {
    return (
      <div className="customer-history-page">
        <Navigation />
        <h1>Service History</h1>
  
        <section className="history-box">
          {serviceHistory.map((serviceHistory, index) => (
            <div key={index} className="history-item">
            <p> Service: {serviceHistory.service}</p>
            <p> Date: {serviceHistory.date} @ {serviceHistory.time}</p>
            <p> Status: {serviceHistory.status}</p>
            </div>
          ))}
        </section>
      </div>
    );
  };
  
  export default CustomerHistory;