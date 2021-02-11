import React, { Fragment, useState, useEffect } from 'react';
import ExercisesCard from './ExercisesCard.jsx';
function Client() {
  const [clientInfo, setclientInfo] = useState();
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
  return (
    <div className='client-home-page-container'>
      <div className='user-profile-container'>
        <div className='image-container'>
          <img
            className='image-class'
            src='https://ca.slack-edge.com/T01C0PF26GK-U01DSA9KMFV-5446a9a02b96-512'
            alt='profile-pic'
          />
        </div>
        <div>
          <h3 className='client-detail'>Matt Jiang</h3>
        </div>
        <div className='client-details-container'>
          <p className='client-detail'>age: 25</p>
          <p className='client-detail'>gender:male</p>
          <p className='client-detail'>height:10ft</p>
          <p className='client-detail'>weight: 180lbs</p>
        </div>
      </div>
      <div className='cards-feed-container'>{exerciseCards}</div>
    </div>
  );
}

export default Client;
