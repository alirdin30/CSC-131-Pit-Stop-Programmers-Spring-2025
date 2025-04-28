import Navigation from "../components/Navigation";

const updatedStatus = ""; //get status from previous page

const StatusUpdateConfirmation = () => {
    return (
      <div className="UpdateConfirmation-page">
      <Navigation />
  
      <section className="update-confirmation">
      <h1>Status Update Confirmation</h1>
        <p>
          Customer vehicle status has been updated to {updatedStatus}.
        </p>
        </section>
    </div>
    );
  };

  export default StatusUpdateConfirmation;