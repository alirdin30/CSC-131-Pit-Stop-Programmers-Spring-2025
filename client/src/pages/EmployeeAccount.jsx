import Navigation from "../components/Navigation";
import BlueButton from "../components/BlueButton";
import { useNavigate } from "react-router-dom";

const EmployeeAccount = () => {
  const navigate = useNavigate();

  return (
    <div className="employee-account-page">
      <Navigation />

      <section className="employee-account">
        <h1>Employee Account</h1>
        <div>
          <BlueButton
            text="Pending Appointments"
            onClick={() => navigate("/pending-appointments")}
          />
          <BlueButton
            text="Assigned Appointments"
            onClick={() => navigate("/assigned-appointments")}
          />
          <BlueButton
            text="Services History"
            onClick={() => navigate("/employee-service-history")}
          />
        </div>
      </section>
    </div>
  );
};

export default EmployeeAccount;