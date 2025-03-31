import Navigation from "../components/Navigation";
import BlueButton from "../components/BlueButton";
import { useNavigate } from "react-router-dom";


const AdminAccount = () => {
  const navigate = useNavigate();

  const EditServices = async () => {
    navigate('/edit-services'); // Redirect to the edit services page
  };

  const ServiceHistory = async () => {
    navigate('/admin-service-history'); //Redirect to the admin side's service appointment history page
  }

  const EmployeeLog = async () => {
    navigate('/employee-log'); //Redirect to the admin side's Employee Log page
  }

  return (
    <div className="admin-account-page">
      <Navigation />

      <section className="admin-account">
        <h1>Admin Account</h1>

        <BlueButton text="Edit Services" onClick={EditServices} />
        <BlueButton text="Service Appointment History" onClick={ServiceHistory} />
        <BlueButton text="Employee Log" onClick={EmployeeLog} />
      </section>
    </div>
  );
}

export default AdminAccount;