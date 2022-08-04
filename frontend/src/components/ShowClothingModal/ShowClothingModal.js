import React, { useState, useEffect, useContext } from 'react';
import './ShowClothingModal.css';
import Modal from '../Modal/Modal';
import { weatherTypesInFahrenheit, weatherTypesInCelsius } from '../../utils/formConstants';
import capImage from '../../images/Clothes/letter-embroidered-baseball-cap.png';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';

/**
 * The ShowClothingModal component
 * ** This modal pops open to the specific clothing card the user clicks on.
 *
 * @author [Sam](https://github.com/Samm96)
 *
 *
 */

const ShowClothingModal = ({ card, handleClick, isOpen, onClose }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const [tempCondition, setTempCondition] = useState('');
  const [isLiked, setIsLiked] = useState('clothing-modal__like');

  useEffect(() => {
    card.isLiked === true
      ? setIsLiked('clothing-modal__like clothing-modal__like_active')
      : setIsLiked('clothing-modal__like');
  }, [card.isLiked]);

  useEffect(() => {
    const handleFahrenheit = () => {
      const weatherFahFiltered = weatherTypesInFahrenheit.filter(
        (weatherType) => weatherType.value === card.weather
      );
      let weatherType = weatherFahFiltered
        .map((type) => {
          return type.name;
        })
        .toString();
      return weatherType;
    };

    const handleCelsius = () => {
      const weatherCelFiltered = weatherTypesInCelsius.filter(
        (weatherType) => weatherType.value === card.weather
      );
      let weatherType = weatherCelFiltered
        .map((type) => {
          return type.name;
        })
        .toString();
      return weatherType;
    };

    if (currentTemperatureUnit === 'F') {
      setTempCondition(handleFahrenheit);
    } else {
      setTempCondition(handleCelsius);
    }
  }, [card.weather, currentTemperatureUnit]);

  return (
    <Modal
      name="ShowClothingModal"
      position="middle"
      width="wide"
      isOpen={card && isOpen}
      onClose={onClose}
    >
      <div className="clothing-modal">
        <div className="clothing-modal__name-container">
          <p className="clothing-modal__name">{card.name}</p>
          <span className={isLiked} alt="like-button"></span>
        </div>
        <img
          src={(card && card.imageUrl) || capImage}
          alt={(card && card.name) || ''}
          className="clothing-modal__image"
        />
        <div className="clothing-modal__text-container">
          <p className="clothing-modal__text clothing-modal__text_type_heading">Type:</p>
          <p className="clothing-modal__text">{card.type || 'Accessories'}</p>
          <p className="clothing-modal__text clothing-modal__text_type_heading">
            Temperature:
          </p>{' '}
          <p className="clothing-modal__text">{tempCondition || ''}</p>
          <button onClick={handleClick} className="clothing-modal__button">
            Edit
          </button>{' '}
        </div>
      </div>
    </Modal>
  );
};

export default ShowClothingModal;
