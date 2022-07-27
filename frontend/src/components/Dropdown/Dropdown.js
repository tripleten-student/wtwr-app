import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Dropdown.css';
import arrow from '../../images/dropdown-arrow.svg';

/**
 * The **Dropdown** component shows the dropdowns in the forms.
 *
 * @author [Shraddha](https://github.com/5hraddha)
 */
const Dropdown = ({ dropdownName, header, options, userPreferenceValue = '', onDropdownItemClick, setIsFormValid }) => {
  const ref = useRef(null);
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const [selectedDropdownListItemLabel, setSelectedDropdownListItemLabel] = useState('Choose');

  // Close dropdown menu if user clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropdownMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isDropdownMenuOpen]);

  // Check if there is already an option that user has selected
  useEffect(() => {
    if (userPreferenceValue) {
      const userSelectedOption = options.find((option) => option.value === userPreferenceValue);
      setSelectedDropdownListItemLabel(userSelectedOption.name);
      onDropdownItemClick(userSelectedOption.value);
    }
  }, [options, userPreferenceValue, onDropdownItemClick]);

  const handleDropdownSelectedItemClick = () => setIsDropdownMenuOpen(!isDropdownMenuOpen);

  const handleDropdownListItemClick = (event) => {
    setSelectedDropdownListItemLabel(event.target.innerText);
    setIsDropdownMenuOpen(false);
    setIsFormValid(true);
    onDropdownItemClick(event.target.dataset.value);
  }

  return (
    <div ref={ref} className={`dropdown dropdown_rel_${dropdownName}`}>
      <h3 className="dropdown__header">{header}</h3>
      <div className="dropdown__options">
        <div
          className={`dropdown__selected-list-item
            ${selectedDropdownListItemLabel === 'Choose' && `dropdown__selected-list-item_no-value`}`}
          onClick={handleDropdownSelectedItemClick}>
          {selectedDropdownListItemLabel}
          <img src={arrow} alt="dropdown-arrow" className={`dropdown__arrow ${isDropdownMenuOpen && `dropdown__arrow_rotated`}`} />
        </div>
        {isDropdownMenuOpen && (
          <div className="dropdown__list-container">
            <ul className="dropdown__list">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="dropdown__list-item"
                  data-value={option.value}
                  onClick={handleDropdownListItemClick}>
                  {option.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  dropdownName: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  userPreferenceValue: PropTypes.string,
  onDropdownItemClick: PropTypes.func.isRequired,
  setIsFormValid: PropTypes.func.isRequired,
}

export default Dropdown;
