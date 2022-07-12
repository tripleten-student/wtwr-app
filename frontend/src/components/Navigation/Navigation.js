import React from 'react';
import './Navigation.css';

/**
 * The Navigation component includes the ToggleSwitch component
 *
 * @author [Sam](https://github.com/Samm96)
 */

function Navigation({ isLoggedIn, username, hasAvatar }) {
  const defaultUser = 'Terrence Tegegne';

  return (
    <div className="navigation">
      <button className="navigation__button">{ isLoggedIn ? (username || defaultUser) : 'Sign In'}</button>
      <button className="navigation__button">{ isLoggedIn ? '+ Add clothes' : 'Log In'}</button>
      {isLoggedIn ? (
        <img
          className="navigation__user"
          src={
            hasAvatar
              ? require('../../images/avatar-default.png')
              : require('../../images/avatar-false.png')
          }
          alt="user avatar"
        />
      ) : (
        <img className="navigation__user navigation__user_signin" alt="user avatar" />
      )}
    </div>
  );
}

export default Navigation;
