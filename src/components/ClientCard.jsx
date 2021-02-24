import React, { Fragment, useState, useEffect } from 'react';
function ClientCard({ clientInfo }) {
  const { first_name, last_name, age, gender, height, weight } = clientInfo;
  return (
<div className='user-profile-container'>
        <div className='image-container'>
          <img
            className='image-class'
            src="https://img.icons8.com/emoji/48/000000/face-with-medical-mask.png"
            alt='profile-pic'
          />
        </div>
        <div>
          <h3 className='client-detail'>{`${first_name} ${last_name}`}</h3>
        </div>
        <div className='client-details-container'>
          <p className='client-detail'>{`Age: ${age}`}</p>
          <p className='client-detail'>{`Gender: ${gender}`}</p>
          <p className='client-detail'>{`Height: ${height} ft`}</p>
          <p className='client-detail'>{`Weight: ${weight} lbs`}</p>
        </div>
      </div>
  )
}

export default ClientCard;