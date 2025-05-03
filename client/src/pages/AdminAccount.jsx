import Navigation from "../components/Navigation";
import BlueButton from "../components/BlueButton";
import { useNavigate } from "react-router-dom";

const AdminAccount = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-account-page">
      <Navigation />

      <section className="admin-account">
        <h1>Admin Account</h1>

        <BlueButton text="Edit Services" onClick={() => navigate("/edit-services")} />
        <BlueButton text="Service Appointment History" onClick={() => navigate("/admin-service-history")} />
        <BlueButton text="Approve Hours" onClick={() => navigate("/ApproveHours")} />
        <BlueButton text="Manage Employees" onClick={() => navigate("/manage-employees")} />
        <BlueButton text="Statistics" onClick={() => navigate("/Statistics")} />
        <BlueButton text="Edit Profile" onClick={() => navigate("/edit-profile")} />
      </section>
    </div>
  );
};

export default AdminAccount;