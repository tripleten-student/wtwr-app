import { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import Dropdown from '../Dropdown/Dropdown';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { checkIfImageExists } from '../../utils/clothingModals';
import {
  clothingItems,
  weatherTypesInFahrenheit,
  weatherTypesInCelsius,
} from '../../utils/formConstants';

/**
 * The **CreateClothingModal** component will let users add new clothes to the database.
 *
 *  @author [Shraddha](https://github.com/5hraddha)
 */
const CreateClothingModal = ({ isOpen, onClose, onSubmitAddGarment }) => {
  // Component states & ref
  const formRef = useRef();
  const [isFormValid, setIsFormValid] = useState(false);
  const [garmentTypeChoice, setGarmentTypeChoice] = useState('');
  const [weatherTypeChoice, setWeatherTypeChoice] = useState('');
  const [showImagePreview, setShowImagePreview] = useState(false);

  //Get the current choice of the temperature unit by the user
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const { values, isValid, errors, handleChange, resetForm } = useFormAndValidation([
    'new-garment-name',
    'new-garment-image-url',
  ]);

  // Set the validity of the form
  useEffect(() => {
    setIsFormValid(formRef.current.checkValidity() && garmentTypeChoice !== '' && weatherTypeChoice !== '');
  }, [isOpen, formRef, garmentTypeChoice, weatherTypeChoice]);

  // Reset form values every time the popup opens
  useEffect(() => {
    const initialValues = {
      'new-garment-name': '',
      'new-garment-image-url': '',
    };
    resetForm({ ...initialValues }, { ...initialValues }, true);
    setShowImagePreview(false);
  }, [isOpen, resetForm]);

  // Event handlers
  const handleCloseImagePreviewButtonClick = () => setShowImagePreview(false);

  const handleInputChange = (event) => {
    if (event.target.name === 'new-garment-image-url') {
      checkIfImageExists(event.target.value, (exists) => {
        if (exists) {
          setShowImagePreview(true);
        } else {
          setShowImagePreview(false);
        }
      });
    }
    handleChange(event);
  };

  const handleFormChange = () => {
    setIsFormValid(formRef.current.checkValidity() && garmentTypeChoice !== '' && weatherTypeChoice !== '');
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // naming of the fields to be checked again when backend API is connected
    if (isValid) {
      onSubmitAddGarment(
        values['new-garment-name'],
        garmentTypeChoice,
        weatherTypeChoice,
        values['new-garment-image-url']
      );
    }
  };

  // Set form elements classnames
  const setInputLabelClassName = (name) => `form__input-label ${(!isValid && errors[name]) && `form__input-label_error`}`;
  const setInputClassName = (name) => `form__input ${(!isValid && errors[name]) && `form__input_error`}`;
  const setErrorClassName = (name) => `form__error ${(!isValid && errors[name]) && `form__error_visible`}`;
  const submitButtonClassName = `form__submit-button ${!isFormValid && 'form__submit-button_disabled'}`;

  return (
    <ModalWithForm
      formTitle="New garment"
      name="add-clothes"
      position="middle"
      width="normal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      onChange={handleFormChange}
      ref={formRef}
    >
      <div className="form__input-container">
        <div className="form__input-label-container">
          <label htmlFor="new-garment-name" className={setInputLabelClassName('new-garment-name')}>
            Name
          </label>
          <p id="new-garment-name-error" className={setErrorClassName('new-garment-name')}>
            {(errors['new-garment-name']) && '(this is not a valid name)'}
          </p>
        </div>
        <input
          type="text"
          id="new-garment-name"
          name="new-garment-name"
          placeholder="Name"
          className={setInputClassName('new-garment-name')}
          value={values['new-garment-name']}
          onChange={handleInputChange}
          minLength="2"
          maxLength="40"
          required
        />
      </div>
      <div className="form__dropdown-container">
        <Dropdown
          dropdownName="garment-types"
          header="Type"
          options={clothingItems}
          onDropdownItemClick={setGarmentTypeChoice}
          setIsFormValid={setIsFormValid}
          isModalOpen={isOpen} />
      </div>
      <div className="form__dropdown-container">
        <Dropdown
          dropdownName="weather-types"
          header="Weather"
          options={(currentTemperatureUnit === 'F') ? weatherTypesInFahrenheit : weatherTypesInCelsius}
          onDropdownItemClick={setWeatherTypeChoice}
          setIsFormValid={setIsFormValid}
          isModalOpen={isOpen} />
      </div>
      <div className="form__input-container">
        <div className="form__input-label-container">
          <label htmlFor="new-garment-image-url" className={setInputLabelClassName('new-garment-image-url')}>
            Image
          </label>
          <p id="new-garment-image-url-error" className={setErrorClassName('new-garment-image-url')}>
            {(errors['new-garment-image-url']) && '(this is not a valid url)'}
          </p>
        </div>
        <input
          type="url"
          id="new-garment-image-url"
          name="new-garment-image-url"
          placeholder="Image URL"
          className={setInputClassName('new-garment-image-url')}
          value={values['new-garment-image-url']}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* If Image URL actully exists & there is no validation error, then display preview */}
      {(showImagePreview && !errors['new-garment-image-url']) && (
        <div className="form__image-preview-container">
          <img src={values['new-garment-image-url']} alt="new garment" className="form__image-preview" />
          <button className="form__image-preview-close" type="button" aria-label="Close image preview" onClick={handleCloseImagePreviewButtonClick} />
        </div>
      )}
      <div className="form__button-grp">
        <button
          type="submit"
          className={submitButtonClassName}
          disabled={!isFormValid}
          aria-label="Add garment"
        >
          Add garment
        </button>
      </div>
    </ModalWithForm>
  );
};

CreateClothingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitAddGarment: PropTypes.func.isRequired,
};

export default CreateClothingModal;
