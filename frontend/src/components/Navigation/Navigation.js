import React from 'react';
import './Navigation.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

/**
 * The Navigation component includes the ToggleSwitch component
 *
 * @author [Sam](https://github.com/Samm96)
 */

function Navigation() {
  return (
    <div className="navigation">
      <button className="navigation__button">Sign Up</button>
      <button className="navigation__button">Log In</button>
      <img className="navigation__user" src={ require('../../images/avatar-default.png') } alt="user avatar" />
    </div>
  );
}

export default Navigation;
