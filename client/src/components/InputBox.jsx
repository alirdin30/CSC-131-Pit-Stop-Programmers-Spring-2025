import React from 'react';

const InputBox = ({ label, placeholder, value, onChange, type = "text" }) => {
  return (
    <div className="input-box-container">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        className="input-box"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;