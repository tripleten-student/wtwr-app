import React from 'react';
import './SideBar.css';
import PropTypes from 'prop-types';
import CurrentUserContext from '../../contexts/CurrentUserContext';

/**
 * The **SideBar** component displays all the links to open the modals that will allow the user to modify some of the data
 *
 * @author [Santiago](https://github.com/Santiag0SR)
 */

const SideBar = ({
  onChangePasswordClick,
  onChangeProfileClick,
  onChangeClothesPreferencesClick,
  onLogOutClick,
  onDeleteProfileClick,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  if (!currentUser) return null;
  const { username, avatar } = currentUser;
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        {avatar ? (
          <img
            className="navigation__user navigation__user_location_profile"
            /** Add user avatar prop and replace this with it */
            src={avatar}
            alt="user avatar"
          />
        ) : (
          /** takes username, turns string to uppercase and takes first letter */
          <span className="navigation__user navigation__user_location_profile navigation__user_type_none">
            {username?.toUpperCase().charAt(0) || 'T'}
          </span>
        )}

        <p className="sidebar__user-name">
          {username}
          {/* // TO ADD LATER {currentUser.name} */}{' '}
        </p>
      </div>
      <ul className="sidebar__links">
        <li className="sidebar__link" onClick={onChangePasswordClick}>
          Change password
        </li>
        <li className="sidebar__link" onClick={onChangeProfileClick}>
          Change profile data
        </li>
        <li className="sidebar__link" onClick={onChangeClothesPreferencesClick}>
          Change clothes preferences
        </li>
        <li className="sidebar__link" onClick={onLogOutClick}>
          Log out
        </li>
        <li className="sidebar__link sidebar__link_type_delete" onClick={onDeleteProfileClick}>
          Delete profile
        </li>
      </ul>
    </div>
  );
};

SideBar.propTypes = {
  onChangePasswordClick: PropTypes.func.isRequired,
  onChangeProfileClick: PropTypes.func.isRequired,
  onChangeClothesPreferencesClick: PropTypes.func.isRequired,
  onLogOutClick: PropTypes.func.isRequired,
  onDeleteProfileClick: PropTypes.func.isRequired,
};

export default SideBar;
