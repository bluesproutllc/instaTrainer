import React, { Fragment, useState, useEffect } from 'react';
function Header({bio}) {
  // const {first_name, last_name} = bio;
  return (
    <div>
      <nav id="header">
        {/* <h1>{first_name && last_name && `Hello ${first_name} ${last_name}`}</h1> */}
        <h1>Hello!</h1>
      </nav>
    </div>
  )
}

export default Header;