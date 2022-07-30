import React, { useState, useEffect } from 'react';
import './ShowClothingModal.css';
import Modal from '../Modal/Modal';
import { weatherTypes } from '../../utils/formConstants';

/**
 * The ShowClothingModal component
 * ** This modal pops open to the specific clothing card the user clicks on.
 *
 * @author [Sam](https://github.com/Samm96)
 *
 * `tempDegree` = at what temperature the clothing on the clicked card are set for
 * `tempUnit` = which unit the user is setting
 *
 */

const ShowClothingModal = ({
  card,
  tempUnit,
  handleClick,
  isOpen,
  onClose,
}) => {
  
  const [temperatureRange, setTemperatureRange] = useState('');

  let obj = weatherTypes.find((weatherType) => weatherType.value === card.weather);
  console.log(obj);

  return (
    <Modal
      name="ShowClothingModal"
      position="middle"
      width="wide"
      isOpen={card && isOpen}
      onClose={onClose}
    >
      <div className="clothing-modal">
        <img
          src={(card && card.imageUrl) || require('../../images/Clothes/letter-embroidered-baseball-cap.png')}
          alt={(card && card.name) || "clothing"}
          className="clothing-modal__image"
        />
        <div className="clothing-modal__text-container">
          <p className="clothing-modal__text clothing-modal__text_type_heading">Type:</p>
          <p className="clothing-modal__text">{card.type || 'Accessories'}</p>
          <p className="clothing-modal__text clothing-modal__text_type_heading">
            Temperature:
          </p>{' '}
          <p className="clothing-modal__text">
            {card.weather || 'Hot'} ({temperatureRange || 70}° {tempUnit || 'F'})
          </p>
          <button onClick={handleClick} className="clothing-modal__button">
            Edit
          </button>{' '}
        </div>
      </div>
    </Modal>
  );
};

export default ShowClothingModal;
