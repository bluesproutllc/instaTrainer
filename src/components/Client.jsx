import React, { Fragment, useState, useEffect } from 'react';
import ExercisesCard from './ExercisesCard.jsx';
import ClientCard from './ClientCard';

function Client() {
  const [getExercises, setgetExercises] = useState([]);
  //will remove use effect once enpoint has been connected with backend
  useEffect(() => {
    //get client id from cookie
    fetch(`/api/clients/dashboard/`)
      .then((res) => res.json())
      .then((response) => {
        const exerciseCards = response.map((exercise) => {
          return (
            <ExercisesCard
              duration={exercise.plan_duration}
              frequency={exercise.frequency}
              notest={exercise.notes}
            />
          );
        });
        setgetExercises(exerciseCards);
      })
      .catch((err) => console.log(err));
  }, []);
  //tentative have loop to show cards - will wait on backend endpoint connection later
  const exerciseCards = [];
  for (let i = 0; i < 5; i += 1) {
    exerciseCards.push(<ExercisesCard />);
  }
  const clientInfo = { first_name:'FIRSTNAME', last_name: 'LASTNAME', age: 'AGE', gender: 'GENDER', height: 'HEIGHT', weight: 'WEIGHT' }
  return (
    <div className='client-home-page-container'>
      <ClientCard clientInfo={clientInfo} />
      <div className='cards-feed-container'>{exerciseCards}</div>
    </div>
  );
}

export default Client;
