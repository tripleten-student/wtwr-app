import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

/**
 * The Navigation component
 *
 * @author [Sam](https://github.com/Samm96)
 *
 * NOTE: routes to respective modals need to be added
 */

function Navigation({ isLoggedIn, hasAvatar, username, handleRegisterClick, handleLoginClick }) {
  const defaultUser = 'Terrence Tegegne';

  return (
    <nav className="navigation">
      {isLoggedIn ? (
        <ul className="navigation__container">
          <li>
            <button className="navigation__button">+ Add clothes</button>
          </li>
          <li>
            <NavLink to="/profile" className="navigation__link">
              {username || defaultUser}
              {hasAvatar ? (
                <img
                  className="navigation__user"
                  /** Add user avatar prop and replace this with it */
                  src={require('../../images/avatar-default.png')}
                  alt="user avatar"
                />
              ) : (
                /** takes username, turns string to uppercase and takes first letter */
                <span className="navigation__user navigation__user_type_none">
                  {username.toUpperCase().charAt(0) || 'T'}
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="navigation__container">
          <li>
            <button
              onClick={handleRegisterClick}
              className="navigation__button navigation__button_hidden"
            >
              Sign Up
            </button>
          </li>
          <li>
            <button
              className="navigation__button navigation__button_hidden"
              onClick={handleLoginClick}
            >
              Log In
            </button>
          </li>
          <li>
            <ToggleSwitch/>
          </li>
          <li>
            <button className="navigation__addButton">
              <img
                className="navigation__addButton-plus"
                src={require('../../images/plus-sign.png')}
                alt="+"
              />
            </button>
          </li>
          <li>
            <img
              className="navigation__modalButton"
              src={require('../../images/modal-button.png')}
              alt="signin/login"
            />
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
