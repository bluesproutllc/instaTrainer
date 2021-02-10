import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './routes/PrivateRoute.jsx';

import Client from './components/Client.jsx';
import Trainer from './components/Trainer.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>  
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/client/dashboard">Client</Link>
            </li>
            <li>
              <Link to="/trainer/dashboard">Trainer</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          {/* restricted login route */}
          <Route exact path="/">
            <Login />
          </Route>
          {/* restricted signup route */}
          <Route path="/signup">
            <Signup />
          </Route>
          {/* private trainer route */}
          <Route path="/trainer/dashboard">
            <Trainer />
          </Route>
          {/* private client route */}
          <PrivateRoute component={Client} path="/client/dashboard"/>
          {/* <Route path="/client/dashboard">
            <Client />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}
export default App;
