import React, { Fragment, useState, useEffect } from 'react';
import Client from './Client.jsx';
import Trainer from './Trainer.jsx';
import { isTrainer } from '../utils.js'

function Dashboard() {
  return (
    <div>
      {(isTrainer() ? <Trainer /> : <Client />)}
    </div>
  )
}

export default Dashboard;