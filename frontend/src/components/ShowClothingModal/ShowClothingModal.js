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

function ShowClothingModal({ clothingType, tempType, tempDegree, tempUnit, path, handleClick }) {
  return (
    <Modal name="ShowClothingModal" position="middle" width="wide" isOpen="modal_opened">
      <div className="clothing-modal__container">
        <img
          src={require('../../images/Clothes/letter-embroidered-baseball-cap.png')}
          alt="clothing"
          className="clothing-modal__image"
        />
          <div className="clothing-modal__text-container">
            <p className="clothing-modal__text">Type: {clothingType || 'Accessories'}</p>
            <p className="clothing-modal__text">Temperature: {tempType || 'Hot'} ({tempDegree || 70}° {tempUnit || 'F+'})</p> {/** may need to adjust css on this later to fit a range(?) */}
            <a href='*' onClick={handleClick} className="clothing-modal__link">Edit</a> {/** may need to change tag? */}
          </div>
      </div>
    </Modal>
  );
}

export default ShowClothingModal;
