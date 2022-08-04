import { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ClothingSelectorButton from '../ClothingSelectorButton/ClothingSelectorButton';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { clothingItems } from '../../utils/formConstants';
import './EditClothingPreferencesModal.css';

/**
 * The **EditClothingPreferences** component enables a logged in user to edit choices for clothing items.
 *
 * @author [Shraddha](https://github.com/5hraddha)
 */
const EditClothingPreferences = ({ isOpen, onClose, onSubmit, errorMessage }) => {
  const ref = useRef();
  const { preferences } = useContext(CurrentUserContext);
  const [clothingPreferences, setClothingPreferences] = useState([]);

  useEffect(() => {
    setClothingPreferences(preferences);
  }, [preferences]);

  const handleClothingItemSelect = (selection) => {
    clothingPreferences.includes(selection)
      ? setClothingPreferences(clothingPreferences.filter((item) => item !== selection))
      : setClothingPreferences([...clothingPreferences, selection]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(clothingPreferences);
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
            clothingPreferences={clothingPreferences || []}
          />
        ))}
      </div>

      <div className="form__button-grp">
        <button type="submit" className="form__submit-button" aria-label="Save Changes">
          Save Changes
        </button>
        {errorMessage && <p className="form__invalid-message">{errorMessage}</p>}
      </div>
    </ModalWithForm>
  );
};

EditClothingPreferences.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditClothingPreferences;
