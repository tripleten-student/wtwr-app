import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

/**
 * The Navigation component
 *
 * @author [Sam](https://github.com/Samm96)
 *
 * NOTE: actual username prop needs to be added in place of `defaultUser`
 * NOTE: routes to respective modals need to be added
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
              {defaultUser} || {username}
              {hasAvatar ? (
                <img
                  className="navigation__user"
                  src={require('../../images/avatar-default.png')}
                  alt="user avatar"
                />
              ) : (
                <img
                  className="navigation__user"
                  src={require('../../images/avatar-false.png')}
                  alt="user avatar"
                />
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
          <li>
            <img className="navigation__user navigation__user_signin" alt="user avatar" />
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
