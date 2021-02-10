import React, { Fragment, useState, useEffect } from 'react';
function ExercisesCard() {
  return (
    <div className='client-card-container'>
      <div className='image-side-container'>
        <img
          className='exercise-image'
          src='https://image.shutterstock.com/image-photo/father-working-out-doing-single-260nw-1669031986.jpg'
          alt=''
        />
      </div>
      <div className='exercise-info-container'>
        <p>Duration: 15min</p>
        <p>Frequency: 2 times/day</p>
        <p>Notes: Its grind time. No days off bro!</p>
      </div>
    </div>
  );
}

export default ExercisesCard;
