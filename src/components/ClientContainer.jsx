import React, { Fragment, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import ExercisesCard from './ExercisesCard.jsx';
import ClientCard from './ClientCard.jsx';

function ClientContainer(props) {
  const { params } = useRouteMatch();
  const clientId = params.clientid;
  console.log('ClientContainer clientId: ', clientId);
  //tentative have loop to show cards - will wait on backend endpoint connection 

  //make fetch request to get workouts and clientInfo
  const clientInfo = { first_name:'FIRSTNAME', last_name: 'LASTNAME', age: 'AGE', gender: 'GENDER', height: 'HEIGHT', weight: 'WEIGHT' }
  //TODO: use exercise id as key
  const exerciseCards = [];
  for (let i = 0; i < 5; i += 1) {
    exerciseCards.push(<ExercisesCard key={i}/>);
  }
  return (
    <div className='client-home-page-container'>
      <ClientCard clientInfo={clientInfo}/>
      <div className='cards-feed-container'>{exerciseCards}</div>
    </div>
  );
}

export default ClientContainer;
