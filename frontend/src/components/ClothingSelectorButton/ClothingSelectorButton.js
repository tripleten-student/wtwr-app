import React, { useState } from 'react';
import './ClothingSelectorButton.css';

const ClothingSelectorButton = ({ onItemSelect, item, clothingPreferences }) => {
  const { name, value } = item;
  const [isSelected, setIsSelected] = useState(clothingPreferences.includes(value));

  const handleClick = () => {
    onItemSelect(value);
    setIsSelected(!isSelected)
  };

  return (
    <button
      type="button"
      className={`preferences__button ${isSelected? 'preferences__button_selected':''}`}
      onClick={handleClick}
      value={value}
    >
      {name}
    </button>
  );
};

export default ClothingSelectorButton;
