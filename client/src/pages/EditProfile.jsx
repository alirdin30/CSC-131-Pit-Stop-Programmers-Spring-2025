import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import BlueButton from "../components/BlueButton";
import InputBox from "../components/InputBox";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "••••••",
  });
  const [editingField, setEditingField] = useState(null);
  const [newValue, setNewValue] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/auth/status", {
          withCredentials: true,
        });
        const { name, email } = response.data.user;
        setProfileData({ name, email, password: "••••••" });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage("Failed to load profile. Please try again.");
        setIsSuccess(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = (field) => {
    setEditingField(field);
    setNewValue(profileData[field]);
    setIsModalOpen(true);
  };

  const handleSaveClick = async () => {
    try {
      const updatedData = { ...profileData, [editingField]: newValue };
      if (editingField === "password" && newValue === "••••••") {
        setMessage("Password cannot be empty.");
        setIsSuccess(false);
        return;
      }

      await axios.put(
        `/api/user/${profileData.email}`,
        { [editingField]: newValue },
        { withCredentials: true }
      );

      setProfileData(updatedData);
      setEditingField(null);
      setIsModalOpen(false);
      setMessage("Profile updated successfully!");
      setIsSuccess(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile. Please try again.");
      setIsSuccess(false);
    }
  };

  const handleCancelClick = () => {
    setEditingField(null);
    setNewValue("");
    setIsModalOpen(false);
  };

  return (
    <div className="edit-profile-page">
      <Navigation />

      <section className="edit-profile">
        <h1>Edit Profile</h1>
        {message && (
          <p className={isSuccess ? "successMessage" : "errorMessage"}>
            {message}
          </p>
        )}
        <div className="profile-field no-edit">
          <label>Email:</label>
          <span>{profileData.email}</span>
        </div>
        <div className="profile-field">
          <label>Name:</label>
          <span>{profileData.name}</span>
          <div className="edit-button-container">
            <BlueButton text="Edit" onClick={() => handleEditClick("name")} />
          </div>
        </div>
        <div className="profile-field">
          <label>Password:</label>
          <span>{profileData.password}</span>
          <div className="edit-button-container">
            <BlueButton
              text="Reset"
              onClick={() => navigate("/forgot-password")}
            />
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit {editingField}</h2>
            <InputBox
              label={editingField}
              placeholder={`Enter your ${editingField}`}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              type={editingField === "password" ? "password" : "text"}
            />
            <div className="modal-actions">
              <BlueButton text="Save" onClick={handleSaveClick} />
              <BlueButton text="Cancel" onClick={handleCancelClick} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;