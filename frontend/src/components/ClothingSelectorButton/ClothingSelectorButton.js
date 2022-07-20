import React, { useState, useEffect } from 'react';
import './ClothingSelectorButton.css';

const ClothingSelectorButton = ({ onItemSelect, item, clothingPreferences }) => {
  const { name, value } = item;
  const [isSelected, setIsSelected] = useState(clothingPreferences.includes(value));

  useEffect(()=>{
    setIsSelected(clothingPreferences.includes(value))
  },[clothingPreferences, value])

  const handleClick = () => {
    onItemSelect(value);
    setIsSelected(clothingPreferences.includes(value))
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
