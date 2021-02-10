import React, { Fragment, useState, useEffect } from 'react';
import Client from './Client.jsx';
import Trainer from './Trainer.jsx';

function Dashboard() {
  const getUserType = () => {
    return 'client';
    return 'trainer';
  }
  return (
    <div>
      <h1>Dashboard Page</h1>
      {(getUserType() === 'client') ? <Client /> : <Trainer />}
    </div>
  )
}

export default Dashboard;