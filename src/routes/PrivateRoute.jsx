
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
  const isLoggedIn = () => {
    return true;
    return false;
  }
  return (

      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route {...rest} render={props => (
          isLoggedIn() ?
              <Component {...props} />
          : <Redirect to="/signup" />
      )} />
  );
};

export default PrivateRoute;