import React from 'react';

const BlueButton = ({ text, onClick }) => {
  return (
    <button className="blue-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default BlueButton;