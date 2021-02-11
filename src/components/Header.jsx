import React, { Fragment, useState, useEffect } from 'react';
function Header({bio}) {
  const {first_name, last_name} = bio;
  return (
    <div>
      <nav id="nav-bar">
        <h2>{first_name && last_name && `Hello ${first_name} ${last_name}`}</h2>
      </nav>
    </div>
  )
}

export default Header;