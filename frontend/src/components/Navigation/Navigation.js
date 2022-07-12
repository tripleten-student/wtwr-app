import React from 'react';
import './Navigation.css';

/**
 * The Navigation component
 *
 * @author [Sam](https://github.com/Samm96)
 * 
 * NOTE: actual username prop needs to be added in place of `defaultUser`
 * NOTE: routes to respective modals need to be added
 */

function Navigation({ isLoggedIn, hasAvatar }) {
  const defaultUser = 'Terrence Tegegne';

  return (
    <div className="navigation">
      <button className="navigation__button">{ isLoggedIn ? '+ Add clothes' : 'Sign In'}</button>
      <button className="navigation__button">{ isLoggedIn ? defaultUser : 'Log In'}</button>
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
