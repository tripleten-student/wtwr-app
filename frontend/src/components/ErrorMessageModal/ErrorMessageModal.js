import React from 'react';
import Modal from '../Modal/Modal';
import './ErrorMessageModal.css';

const ErrorMessageModal = ({ isOpen, onClose, errorMessage }) => {
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
      <p className="confirmation__text">{errorMessage}</p>
      <button className="confirmation__button" type="button" autoFocus onClick={onClose}>
        Ok
      </button>
    </Modal>
  );
};

export default ErrorMessageModal;
