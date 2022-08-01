import { useContext } from 'react';
import './MobileNavigation.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { NavLink } from 'react-router-dom';
import mobileAddButton from '../../images/plus-sign.png';
import avatarDefault from '../../images/avatar-default.png';
import mobileModalButton from '../../images/modal-button.png';
import CurrentUserContext from '../../contexts/CurrentUserContext';

/**
 * The Navigation - Mobile Version - component
 *
 * @author [Sam](https://github.com/Samm96)
 *
 */

const MobileNavigation = ({ isLoggedIn, openNewGarmentModal, openLoginModal }) => {
  const currentUser = useContext(CurrentUserContext);
  if (!currentUser) return null;
  const { username, avatar } = currentUser;

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
              src={mobileAddButton}
              alt="+"
            />
          </button>
        </li>
        <li>
          {isLoggedIn ? (
            <NavLink to="/profile" className="navigation-mobile__link">
              {avatar ? (
                <img
                  className="navigation-mobile__user"
                  src={avatar || avatarDefault}
                  alt="user avatar"
                />
              ) : (
                <span className="navigation-mobile__user navigation-mobile__user_type_none">
                  {username?.toUpperCase().charAt(0) || 'T'}
                </span>
              )}
            </NavLink>
          ) : (
            <button className="navigation-mobile__modalButton" onClick={openLoginModal}>
              <img
                className="navigation-mobile__modalButton-image"
                src={mobileModalButton}
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
