import React, { Fragment, useState, useEffect } from 'react';
function Header({bio}) {
  const { firstName, lastName} = bio;
  return (
    <div>
      <h1>Header</h1>
      <h2>{`Hello ${firstName} ${lastName}`}</h2>
    </div>
  )
}

export default Header;