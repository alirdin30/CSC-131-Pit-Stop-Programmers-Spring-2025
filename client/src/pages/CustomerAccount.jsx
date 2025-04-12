import Navigation from "../components/Navigation";
import BlueButton from "../components/BlueButton";
import { useNavigate } from "react-router-dom";

const CustomerAccount = () => {
  return (
    <div className="customer-account-page">
      <Navigation />

      <section className="customer-account">
        <h1>Customer Account</h1>
        <div>
                  <BlueButton
                    text="?"
                    onClick={() => navigate("/")}
                  />
                  <BlueButton
                    text="?"
                    onClick={() => navigate("/")}
                  />
                  <BlueButton
                    text="?"
                    onClick={() => navigate("/")}
                  />
        </div>
      </section>
    </div>
  );
}

export default CustomerAccount;