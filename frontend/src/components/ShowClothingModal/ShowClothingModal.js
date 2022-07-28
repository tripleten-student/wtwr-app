import './ShowClothingModal.css';
import Modal from '../Modal/Modal';

/**
 * The ShowClothingModal component
 * ** This modal pops open to the specific clothing card the user clicks on.
 *
 * @author [Sam](https://github.com/Samm96)
 *
 * `clothingType` = What type of clothing is being shown on a clicked card
 * `tempType` = what kind of weather condition the clothing on a clicked card is for
 * `tempDegree` = at what temperature the clothing on the clicked card are set for
 * `tempUnit` = which unit the user is setting
 *
 */

const ShowClothingModal = ({
  garmentType,
  garmentURL,
  weatherType,
  tempDegree,
  tempUnit,
  handleClick,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      name="ShowClothingModal"
      position="middle"
      width="wide"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="clothing-modal">
        <img
          src={garmentURL || require('../../images/Clothes/letter-embroidered-baseball-cap.png')}
          alt="clothing"
          className="clothing-modal__image"
        />
        <div className="clothing-modal__text-container">
          <p className="clothing-modal__text clothing-modal__text_type_heading">Type:</p>
          <p className="clothing-modal__text">{garmentType || 'Accessories'}</p>
          <p className="clothing-modal__text clothing-modal__text_type_heading">
            Temperature:
          </p>{' '}
          <p className="clothing-modal__text">
            {weatherType || 'Hot'} ({tempDegree || 70}° {tempUnit || 'F+'})
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
