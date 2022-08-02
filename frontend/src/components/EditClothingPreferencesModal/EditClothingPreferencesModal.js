import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ClothingSelectorButton from '../ClothingSelectorButton/ClothingSelectorButton';
import { clothingItems } from '../../utils/formConstants';
import './EditClothingPreferencesModal.css';

/**
 * The **EditClothingPreferences** component enables a logged in user to edit choices for clothing items.
 *
 * @author [Shraddha](https://github.com/5hraddha)
 */
const EditClothingPreferences = ({ isOpen, onClose, onSubmit, userClothingPreferences }) => {
  const ref = useRef();
  const [clothingPreferences, setClothingPreferences] = useState([]);

  useEffect(() => {
    setClothingPreferences(userClothingPreferences);
  }, [userClothingPreferences]);

  const handleClothingItemSelect = (selection) => {
    clothingPreferences.includes(selection)
      ? setClothingPreferences(clothingPreferences.filter((item) => item !== selection))
      : clothingPreferences.push(selection);
  };

  const handleFormSubmit = () => {
    onSubmit(clothingPreferences);
    onClose();
  };

  return (
    <ModalWithForm
      ref={ref}
      formTitle="Change clothes preferences"
      name="edit-preferences"
      position="middle"
      width="normal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <div className="clothing-preferences-buttons">
        {clothingItems.map((item) => (
          <ClothingSelectorButton
            item={item}
            key={item.value}
            onItemSelect={handleClothingItemSelect}
            clothingPreferences={clothingPreferences}
          />
        ))}
      </div>

      <div className="form__button-grp">
        <button
          type="submit"
          className="form__submit-button"
          aria-label="Save Changes"
        >
          Save Changes
        </button>
      </div>
    </ModalWithForm>
  );
}

EditClothingPreferences.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  userClothingPreferences: PropTypes.array.isRequired,
}

export default EditClothingPreferences;