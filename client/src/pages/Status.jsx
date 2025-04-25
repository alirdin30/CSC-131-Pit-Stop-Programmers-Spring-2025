import Navigation from "../components/Navigation";

var status0 = "Click Here to View Car Status";
var status1 = "Your car has been checked in.";
var status2 = "The technician has started to work on your car.";
var status3 = "The technician is halfway done with the work on your car.";
var status4 = "The technician is almost done with your car.";
var status5 = "The work on your car is done. You can now pick up your car.";
var currStatus = status0;

// change variable to the status from the database
const activate = () => {
  currStatus = status1;
}

const Status = () => {
    return (
      <div className="status-page">
      <Navigation />
      <h1>Car Status</h1>
  
      <section className="pre-status">
        <p onClick={activate}> {currStatus}</p>
        </section>
    </div>
    );
  };
  
  export default Status;