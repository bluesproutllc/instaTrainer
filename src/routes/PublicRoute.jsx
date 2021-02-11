
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils.js';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
  return (
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route {...rest} render={props => (
          isLoggedIn() && restricted ? <Redirect to="/dashboard" /> : <Component {...props} />
      )} />
  );
};

export default PublicRoute;