import React from 'react';
import './ToggleSwitch.css';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';

/**
 * The **ToggleSwitch** component renders a switch used to toggle temperature units.
 *
 * @author [Shraddha](https://github.com/5hraddha)
 */
const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = React.useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <div className="toggleswitch">
      <label className="toggleswitch__label">
        <input
          className="toggleswitch_checkbox toggleswitch__checkbox_state_hidden"
          type="checkbox"
          name="toggleswitch-checkbox"
          value={currentTemperatureUnit}
          onChange={handleToggleSwitchChange}
        />
        <span className="toggleswitch__checkbox toggleswitch__checkbox_state_visible"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
