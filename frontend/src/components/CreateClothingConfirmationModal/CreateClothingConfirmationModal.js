import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import './CreateClothingConfirmationModal.css';

/**
 * The **CreateClothingConfirmationModal** component confirms that the clothing item has been added.
 *
 *  @author [Shraddha](https://github.com/5hraddha)
 */
const CreateClothingConfirmationModal = ({
  isOpen,
  onClose,
  createdClothingItemUrl,
  createdClothingItemType,
  errorMessage,
}) => {
  const handleHyphenatedWords = (clothingItemType) => {
    if (clothingItemType.includes('-')) {
      const wordsArray = clothingItemType.split('-').map((word) => {
        const charArray = word.split('');
        return `${charArray[0].toUpperCase()}${charArray.slice(1).join('')}`;
      });
      return clothingItemType === 't-shirt' ? wordsArray.join('-') : wordsArray.join(' ');
    }
    return clothingItemType;
  };
  return (
    <Modal
      name="create-clothing-confirmation"
      isOpen={isOpen}
      position="middle"
      width="normal"
      onClose={onClose}
    >
      <div className="confirmation">
        <p className="confirmation__text">{`Your ${handleHyphenatedWords(
          createdClothingItemType
        )} has been added to your collection of clothes!`}</p>
        <p className="confirmation__text">
          You can find it in your profile. It will also be shown in outfits suggestions once it fits
          the weather forecast.
        </p>
        <img
          src={createdClothingItemUrl}
          alt={createdClothingItemType}
          className="confirmation__image-preview"
        />
        <button className="confirmation__button" type="button" autoFocus onClick={onClose}>
          Ok
        </button>
        {errorMessage && <p className="form__invalid-message">{errorMessage}</p>}
      </div>
    </Modal>
  );
};

CreateClothingConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  createdClothingItemUrl: PropTypes.string.isRequired,
  createdClothingItemType: PropTypes.string.isRequired,
};

export default CreateClothingConfirmationModal;
