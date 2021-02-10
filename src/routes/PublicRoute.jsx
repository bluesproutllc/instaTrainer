
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
  const userType = 'client';
  return (

      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route {...rest} render={props => (
          (userType === 'client')?
              <Component {...props} />
          : <Redirect to="/signin" />
      )} />
  );
};

export default PrivateRoute;