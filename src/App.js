import React from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import PrivateRoute from './routes/PrivateRoute.jsx';
import PublicRoute from './routes/PublicRoute.jsx';

import Login from './components/Login.jsx';
import SignupTrainer from './components/SignupTrainer.jsx';
import SignupClient from './components/SignupClient.jsx';
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
              <Link to="/signuptrainer">Signup Trainer</Link>
            </li>
            <li>
              <Link to="/signupclient">Signup Client</Link>
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
          <PublicRoute restricted={true} path="/login" component={Login} />
          <PublicRoute restricted={true} path="/signuptrainer" component={SignupTrainer} />
          <PublicRoute restricted={true} path="/signupclient" component={SignupClient} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/myclients/:client" component={Dashboard} />
          <Route path="*" render={() => <h1>Not found</h1>} />
        </Switch>
      </div>
  );
}
export default App;
