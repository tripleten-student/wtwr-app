import React, { useState } from 'react';
import './ClothingSelectorButton.css';

const ClothingSelectorButton = ({ onItemSelect, item }) => {
  const { name, value } = item;
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onItemSelect(value);
  };

  return (
    <button
      type="button"
      className={`preferences__button ${isSelected && 'preferences__button_selected'}`}
      onClick={handleClick}
      value={value}
    >
      {name}
    </button>
  );
};

export default ClothingSelectorButton;
