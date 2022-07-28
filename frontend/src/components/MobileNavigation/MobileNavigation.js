import './MobileNavigation.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { NavLink } from 'react-router-dom';

/**
 * The Navigation - Mobile Version - component
 *
 * @author [Sam](https://github.com/Samm96)
 *
 */

const MobileNavigation = ({ isLoggedIn, openNewGarmentModal, openLoginModal, hasAvatar, username }) => {
  return (
    <nav className="navigation-mobile">
      <ul className="navigation-mobile__container">
        <li className="navigation-mobile__toggle">
          <ToggleSwitch />
        </li>
        <li>
          <button className="navigation-mobile__addButton" onClick={openNewGarmentModal}>
            <img
              className="navigation-mobile__addButton-plus"
              src={require('../../images/plus-sign.png')}
              alt="+"
            />
          </button>
        </li>
        <li>
          {isLoggedIn ? (
            <NavLink to="/profile" className="navigation-mobile__link">
              {hasAvatar ? (
                <img
                  className="navigation-mobile__user"
                  /** Add user avatar prop and replace this with it */
                  src={hasAvatar || require('../../images/avatar-default.png')}
                  alt="user avatar"
                />
              ) : (
                /** takes username, turns string to uppercase and takes first letter */
                <span className="navigation-mobile__user navigation-mobile__user_type_none">
                  {username.toUpperCase().charAt(0) || 'T'}
                </span>
              )}
            </NavLink>
          ) : (
            <button className="navigation-mobile__modalButton" onClick={openLoginModal}>
              <img
                className="navigation-mobile__modalButton-image"
                src={require('../../images/modal-button.png')}
                alt="signin/login"
              />
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default MobileNavigation;
