import React, { useState } from 'react';

const InputBox = ({ label, placeholder, value, onChange, type = "text" }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="input-box-container">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type === "password" && showPassword ? "text" : type}
        className="input-box"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {type === "password" && (
        <div className="show-password-container">
          <input
            type="checkbox"
            id="show-password"
            checked={showPassword}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="show-password" className="show-password-label">
            Show Password
          </label>
        </div>
      )}
    </div>
  );
};

export default InputBox;