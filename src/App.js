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
import Dashboard from './components/Dashboard.jsx';

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
            {/* <li>
              <Link to="/client/dashboard">Client</Link>
            </li>
            <li>
              <Link to="/trainer/dashboard">Trainer</Link>
            </li> */}
            <li>
              <Link to="/dashboard">Dashboard</Link>
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
          {/* private dashboard route */}
          <PrivateRoute component={Dashboard} path="/dashboard"/>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
