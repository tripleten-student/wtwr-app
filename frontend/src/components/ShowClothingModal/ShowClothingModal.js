import React, { useState, useEffect, useContext } from 'react';
import './ShowClothingModal.css';
import Modal from '../Modal/Modal';
import {
  weatherTypesInFahrenheit,
  weatherTypesInCelsius,
  accessoriesCategory,
  topsAndOuterwearCategory,
  bottomsCategory,
  shoesCategory,
} from '../../utils/formConstants';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';

/**
 * The ShowClothingModal component
 * ** This modal pops open to the specific clothing card the user clicks on.
 *
 * @author [Sam](https://github.com/Samm96)
 *
 *
 */

const ShowClothingModal = ({ card, handleClick, isOpen, onClose, onCardLike }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const [tempCondition, setTempCondition] = useState('');
  const [isLiked, setIsLiked] = useState(card.isLiked);
  const [cardType, setCardType] = useState('');
  const [showCardImg, setShowCardImg] = useState('');
  
  useEffect(() => {
    (isOpen && card) ? setShowCardImg(card.imageUrl) : setShowCardImg('');
  }, [isOpen]);

  useEffect(() => {
    const accessoryTypes = accessoriesCategory.find((type) => type === card.type);
    const topsAndOuterwearTypes = topsAndOuterwearCategory.find((type) => type === card.type);
    const bottomsTypes = bottomsCategory.find((type) => type === card.type);
    const shoeTypes = shoesCategory.find((type) => type === card.type);

    switch (card.type) {
      case accessoryTypes:
        setCardType('Accessories');
        break;
      case topsAndOuterwearTypes:
        setCardType('Tops & Outerwear');
        break;
      case bottomsTypes:
        setCardType('Bottoms');
        break;
      case shoeTypes:
        setCardType('Shoes');
        break;
      default:
        setCardType('Clothing');
    }
  }, [card.type]);

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

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    onCardLike(card)
  }

  const likeButtonClassName = `clothing-modal__like ${isLiked && `clothing-modal__like_active`}`;

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
          <button className={likeButtonClassName} alt="like-button" onClick={handleLikeClick}></button>
        </div>
        <img
          src={(card && showCardImg) || ''}
          alt={(card && card.name) || ''}
          className="clothing-modal__image"
        />
        <div className="clothing-modal__text-container">
          <p className="clothing-modal__text clothing-modal__text_type_heading">Type:</p>
          <p className="clothing-modal__text">{cardType}</p>
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
