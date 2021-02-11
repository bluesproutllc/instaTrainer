import React from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import PrivateRoute from './routes/PrivateRoute.jsx';
import PublicRoute from './routes/PublicRoute.jsx';

import Client from './components/Client.jsx';
import Trainer from './components/Trainer.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  return (
      <div>
        <nav>
          <ul>
            <li>  
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Redirect to="/login"/>
          </Route>
          <PublicRoute component={Login} restricted={true} path="/login" />
          <PublicRoute component={Signup} restricted={true} path="/Signup" />
          <PrivateRoute component={Dashboard} path="/dashboard"/>
          <Route path="*" render={() => <h1>Not found</h1>} />
        </Switch>
      </div>
  );
}
export default App;
