import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

/**
 * The Navigation component
 *
 * @author [Sam](https://github.com/Samm96)
 *
 * NOTE: routes to respective modals need to be added
 * NOTE: add signup modal prop
 * NOTE: add `onClick` to buttons for signin / login modals
 */

function Navigation({ isLoggedIn, hasAvatar, username }) {
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
                  {'T' || { username }.toUpperCase().charAt(0)}
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="navigation__container">
          <li>
            <button className="navigation__button">Sign Up</button>
          </li>
          <li>
            <button className="navigation__button">Log In</button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
