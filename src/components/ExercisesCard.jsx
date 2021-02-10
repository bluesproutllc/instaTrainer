import React, { Fragment, useState, useEffect } from 'react';
function ExercisesCard() {
  return (
    <div className='div-container'>
      <div className='client-card-container'>
        <div className='image-side-container'>
          <img
            className='exercise-image'
            src='https://image.shutterstock.com/image-photo/father-working-out-doing-single-260nw-1669031986.jpg'
            alt=''
          />
        </div>
        <div className='right-side-excercise-card'>
          <div className='exercise-info-container'>
            <p className='exercise-detail'>Duration: 15min</p>
            <p className='exercise-detail'>Frequency: 2 times/day</p>
            <p className='exercise-detail'>
              Notes: Its grind time. No days off bro!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExercisesCard;
