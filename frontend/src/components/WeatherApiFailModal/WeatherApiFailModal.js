import React from 'react';
import Modal from '../Modal/Modal';
import './WeatherApiFailModal.css';

const WeatherApiFailModal = ({ isOpen, onClose }) => {
  /**
   * This module notifies the user of successful registration
   *
   * @author [Yuffie Hu](https://github.com/yuff1006)
   */

  return (
    <Modal
      name="weatherApi-fail-modal"
      isOpen={isOpen}
      position="top-right"
      width="normal"
      onClose={onClose}
    >
      <p className="confirmation__text">Oops, it seems that the Weather API ran into issues...</p>
      <p className="confirmation__text">
        Your live location and weather information could not be accessed. We apologize for the
        inconvenience and have used our best guesses on your weather and location.
      </p>
      <p className="confirmation__text">Enjoy!</p>
      <button className="confirmation__button" type="button" autoFocus onClick={onClose}>
        Ok
      </button>
    </Modal>
  );
};

export default WeatherApiFailModal;
