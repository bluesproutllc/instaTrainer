import React, { Fragment, useState, useEffect } from 'react';
function Header({bio}) {
  const {first_name, last_name} = bio;
  return (
    <div>
      <h1>Header</h1>
      <h2>{`Hello ${first_name} ${last_name}`}</h2>
    </div>
  )
}

export default Header;