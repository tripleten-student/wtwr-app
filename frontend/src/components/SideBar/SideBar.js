import React from 'react';
import './SideBar.css';
import PropTypes from 'prop-types';

import avatar from '../../images/Avatars/elise.png';

/**
 * The **Footer** component displays copyright and year information
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
  // we will add the context and use it to retrive the avatar and name of the user
  //  ADD LATER const currentUser = React.useContext(CurrentUserContext);
  //   asd

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          src={avatar} // TO ADD LATER {currentUser.avatar}
          className="sidebar__user-avatar"
          alt="name of user" // TO ADD LATER {currentUser.name}
        />
        <p className="sidebar__user-name">
          Terrence Tegegne{/* // TO ADD LATER {currentUser.name} */}{' '}
        </p>
      </div>
      <ul className="sidebar__links">
        <li className="sidebar__link" onClick={onChangePasswordClick}>
          Change Password
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
