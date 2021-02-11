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


function Trainer() {
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
              <Link to="/trainer/client">Trainer/Client</Link>
            </li>
            {/* <li>
              <Link to="/trainer/dennis">Dennis</Link>
            </li>
            <li>
              <Link to="/trainer/heidi">Heidi</Link>
            </li> */}
          </ul>
        </nav>
      <Switch>
        <PrivateRoute path="/dashboard" component={ClientsContainer} />
        {/* should be PrivateRoute. path should be /trainer/:clientId but that doesn't work currently*/}
        {/* weird. event the trainer/client route doesn't work currently */}
        <PrivateRoute path="/trainer/client" component={ClientContainer} />
        <Route path="*" render={() => <h1>Not found</h1>} />
      </Switch>
    </div>
  )
}

export default Trainer;