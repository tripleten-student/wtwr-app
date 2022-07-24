import React from 'react';
import './ShowClothingModal.css';
import Modal from '../Modal/Modal';

/**
 * The ShowClothingModal component
 *
 * @author [Sam](https://github.com/Samm96)
 * 
 * `clothingType` = What type of clothing is being shown on a clicked card
 * `tempType` = what kind of weather condition the clothing on a clicked card is for
 * `tempDegree` = at what temperature the clothing on the clicked card are set for
 * `tempUnit` = which unit the user is setting
 *
 */

function ShowClothingModal({ clothingType, tempType, tempDegree, tempUnit, handleClick, isOpen, onClose }) {
  return (
    <Modal name="ShowClothingModal" position="middle" width="wide" isOpen={isOpen} onClose={onClose}>
      <div className="clothing-modal__container">
        {/** placeholder image */}
        <img
          src={require('../../images/Clothes/letter-embroidered-baseball-cap.png')}
          alt="clothing"
          className="clothing-modal__image"
        /> 
          <div className="clothing-modal__text-container">
            <p className="clothing-modal__text clothing-modal__text_type_heading">Type:</p>
            <p className="clothing-modal__text">{clothingType || 'Accessories'}</p>
            <p className="clothing-modal__text clothing-modal__text_type_heading">Temperature:</p> {/** may need to adjust css on this later to fit a range(?) */}
            <p className="clothing-modal__text">{tempType || 'Hot'} ({tempDegree || 70}° {tempUnit || 'F+'})</p>
            <a href='*' onClick={handleClick} className="clothing-modal__link">Edit</a> {/** may need to change tag? */}
          </div>
      </div>
    </Modal>
  );
}

export default ShowClothingModal;
