import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * The **Protected Route** component prevents access to not not logged in users
 * to certain pages.
 *
 * @author [Santiago](https://github.com/Santiag0SR)
 */

const ProtectedRoute = ({ isLoggedIn, children, handleLoginClick, ...props }) => {
  // const jwt = localStorage.getItem('jwt');

  if (isLoggedIn) {
    return children;
  } else {
    // handleLoginClick(); Now it gives an error, this has to be added later once
    // JWT (token) is in local storage and we can change
    //  the variable isLoggedIn for jwt, that way it doesnt give any errors.
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
