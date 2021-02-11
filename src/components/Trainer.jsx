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
import Header from './Header.jsx';

function Trainer(props) {
  const [clientsInfo, setClientsInfo] = useState(null);
  const [trainerInfo, setTrainerInfo] = useState({});

  // get trainer info and client info for each client
  // currently runs every initial time Trainer is rendered (/dashboard or /myclients/:client). this is what we want because client info might change
  useEffect(() => {
    fetch('/api/trainers/dashboard')
    .then((res) => res.json())
    .then((data) => {
      const clientsInfo = data.clients;
      const trainerInfo = data.trainer
      setClientsInfo(clientsInfo);
      setTrainerInfo(trainerInfo);
    });
  }, [])

  return (
    <div>
      <Header bio={trainerInfo}/>
      <Switch>
        <Route path="/dashboard" render={() => <ClientsContainer clientsInfo={clientsInfo} />} />
        <Route path="/myclients/:clientid" render={() => <ClientContainer />} />
      </Switch>
    </div>
  )
}

export default Trainer;