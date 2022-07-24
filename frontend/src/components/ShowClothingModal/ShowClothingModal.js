import React from 'react';
import './ShowClothingModal.css';
import Modal from '../Modal/Modal';
import { NavLink } from 'react-router-dom';

/**
 * The ShowClothingModal component
 *
 * @author [Sam](https://github.com/Samm96)
 *
 */

function ShowClothingModal({ clothingType, tempType, tempDegree, tempUnit, path }) {
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
            <p className="clothing-modal__text">Temperature: {tempType || 'Hot'} ({tempDegree || 70}° {tempUnit || 'F+'})</p>
            <a href={path} className="clothing-modal__link">Edit</a>
          </div>
      </div>
    </Modal>
  );
}

export default ShowClothingModal;
