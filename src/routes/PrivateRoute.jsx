
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({component: Component, ...rest}) => {
  // returns ssid value or undefined
  const isLoggedIn = () => {
    return Cookies.get('ssid');
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