import React from 'react';
import Modal from '../Modal/Modal';
import './CompleteRegistrationModal.css'

const CompleteRegistrationModal = ({ isOpen, onClose }) => {

  /**
 * This module notifies the user of successful registration
 *
 * @author [Devin Jaggernauth](https://github.com/mentalcaries)
 */

  return (
    <Modal
      name="complete-registration-modal"
      isOpen={isOpen}
      position="top-right"
      width="normal"
      onClose={onClose}
    >
      <p className="confirmation__text">Registration is complete, congrats!</p>
      <p className="confirmation__text">Now you can add items from your own wardrobe and get personalized recommendations.</p>
      <button className='confirmation__button' type='button' autoFocus onClick={onClose}>Ok</button>
    </Modal>
  );
};

export default CompleteRegistrationModal;
