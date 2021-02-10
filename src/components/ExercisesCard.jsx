import React, { Fragment, useState, useEffect } from 'react';
function ExercisesCard(props) {
  //console.log(props)
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
            <div className='duration-frequency-container'>
              <div className='duration-box'>
                <p id='duration-min-id' className='exercise-detail'>
                  15min
                </p>
                <p className='exercise-detail'>Duration</p>
              </div>
              <div className='frequency-box'>
                <p id='frequency-time-id' className='exercise-detail'>
                  2 times/day
                </p>{' '}
                <p className='exercise-detail'>Frequency</p>
              </div>
            </div>
            <p id='notes-id' className='exercise-detail'>
              Notes: Its grind time. No days off bro!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExercisesCard;
