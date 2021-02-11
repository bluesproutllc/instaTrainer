import React, { Fragment, useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import PrivateRoute from '../routes/PrivateRoute.jsx';
import PublicRoute from '../routes/PublicRoute.jsx';

import ClientContainer from './ClientContainer.jsx';
import ClientsContainer from './ClientsContainer.jsx';


function Trainer(props) {
  console.log(props);
  return (
    <div>
      <h1>Trainer Page</h1>
      <h1>Header</h1>
      <h1>Sidebar</h1>
      <nav>
          <ul>
            <li>  
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/myclients/dennis">Dennis</Link>
            </li>
            <li>
              <Link to="/myclients/heidi">Heidi</Link>
            </li>
          </ul>
        </nav>
      <Switch>
        <PrivateRoute path="/dashboard" component={ClientsContainer} />
        <PrivateRoute path="/myclients/:client" component={ClientContainer} />
      </Switch>
    </div>
  )
}

export default Trainer;