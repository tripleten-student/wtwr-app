import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

/**
 * The Navigation component
 *
 * @author [Sam](https://github.com/Samm96)
 *
 * NOTE: routes to respective modals need to be added
 */

const Navigation = ({ isLoggedIn, handleRegisterClick, handleLoginClick, handleAddClick }) => {
  const currentUser = React.useContext(CurrentUserContext);
  if (!currentUser) return null;
  const { username, avatar } = currentUser;

  return (
    <nav className="navigation">
      {isLoggedIn ? (
        <ul className="navigation__container">
          <li>
            <button onClick={handleAddClick} className="navigation__button">
              + Add clothes
            </button>
          </li>
          <li>
            <NavLink to="/profile" className="navigation__link">
              {username}
              {avatar ? (
                <img
                  className="navigation__user"
                  /** Add user avatar prop and replace this with it */
                  src={avatar || require('../../images/avatar-default.png')}
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
            <button onClick={handleRegisterClick} className="navigation__button">
              Sign Up
            </button>
          </li>
          <li>
            <button className="navigation__button" onClick={handleLoginClick}>
              Log In
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
