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
 *
 */

const ShowClothingModal = ({
  card,
  handleClick,
  isOpen,
  onClose,
}) => {

  const [ tempCondition, setTempCondition ] = useState('');

  useEffect(() => {
    const weatherFiltered = weatherTypes.filter((weatherType) => weatherType.value === card.weather);
    let weatherType = weatherFiltered.map((type) => { return type.name }).toString();

    setTempCondition(weatherType);
  }, [card.weather]);
  

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
            {tempCondition || 'Hot (70°F)'}
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
