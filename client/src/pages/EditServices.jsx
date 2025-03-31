import Navigation from "../components/Navigation";
import BlueButton from "../components/BlueButton";
import { useNavigate } from "react-router-dom";


const EditServices = () => {
  const navigate = useNavigate();

  return (
    <div className="edit-services-page">
      <Navigation />

      <section className="edit-services">
        <h1>Edit Services</h1>

        <BlueButton text="Edit Service 1" onClick={navigate("/service-editor")} />
        
      </section>
    </div>
  );
}

export default EditServices;