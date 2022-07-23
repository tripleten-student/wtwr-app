import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * The **Protected Route** component prevents access to not not logged in users
 * to certain pages.
 *
 * @author [Santiago](https://github.com/Santiag0SR)
 */

const ProtectedRoute = ({ isLoggedIn, children, handleLoginClick, ...props }) => {
  if (isLoggedIn) {
    return children;
  } else {
    handleLoginClick();
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
