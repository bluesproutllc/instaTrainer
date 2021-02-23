import React, { Fragment, useState, useEffect } from 'react';
import ExercisesCard from './ExercisesCard.jsx';
import ClientCard from './ClientCard';

function Client() {
  const [clientInfo, setClientInfo] = useState();
  const [getExercises, setgetExercises] = useState([]);
  const [authorizedView, setAuthorizedView] = useState(false);
  //will remove use effect once enpoint has been connected with backend

  useEffect(() => {
    //get client id from cookie
    fetch(`/api/clients/dashboard/`)
      .then((res) => res.json())
      .then((response) => {
        setClientInfo({
          first_name: response.profile.first_name,
          last_name: response.profile.last_name,
          gender: response.profile.gender,
          age: response.profile.age,
          height: response.profile.height,
          weight: response.profile.weight,
        });
        const exerciseCards = response.workout.map((workout) => {
          return (
            <ExercisesCard
              name={workout.name}
              plan_duration={workout.plan_duration}
              frequency={workout.frequency}
              notes={workout.notes}
              authorizedView={authorizedView}
            />
          );
        });
        setgetExercises(exerciseCards);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   fetch('/api/clients/dashboard')
  //     .then(res => res.json())
  //     .then(response => console.log(response))
  // })

  //tentative have loop to show cards - will wait on backend endpoint connection later
  // const exerciseCards = [];
  // for (let i = 0; i < 5; i += 1) {
  //   exerciseCards.push(<ExercisesCard />);
  // }
  return (
    <div className='client-home-page-container'>
      {clientInfo && <ClientCard clientInfo={clientInfo} />}
      <div className='cards-feed-container'>{getExercises}</div>
    </div>
  );
}

export default Client;
