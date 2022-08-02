import React from 'react';

/**
 * A custom hook to use form and enable validation on form fields
 *
 * @param {Array} inputNamesArr - An array of names of all the input fields of the form.
 * @returns {Object} - An object having all the necessary properties and methods to work with the form and enable validation.
 */
export function useFormAndValidation(inputNamesArr) {
  const initialValues = {};
  inputNamesArr.map(inputName => initialValues[inputName] = '');
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState(initialValues);
  const [isValid, setIsValid] = React.useState(true);


  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = React.useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, isValid, errors, handleChange, resetForm };
}