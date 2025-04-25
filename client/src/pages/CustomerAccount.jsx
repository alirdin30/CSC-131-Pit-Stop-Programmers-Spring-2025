import Navigation from "../components/Navigation";
import BlueButton from "../components/BlueButton";
import { useNavigate } from "react-router-dom";

const CustomerAccount = () => {
  const navigate = useNavigate();

  return (
    <div className="customer-account-page">
      <Navigation />

      <section className="customer-account">
        <h1>Customer Account</h1>

        <BlueButton text="View Car Status" onClick={() => navigate("/customer-car-status")} />
        <BlueButton text="View Appointments" onClick={() => navigate("/customer-view-appointments")} />
        <BlueButton text="Service History" onClick={() => navigate("/customer-history")} />
        <BlueButton text="Manage Profile" onClick={() => navigate("/edit-profile")} />
      </section>
    </div>
  );
}

export default CustomerAccount;