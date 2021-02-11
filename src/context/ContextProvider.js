import React, { useState } from 'react';
import AppContext from './index.js';

const ContextProvider = ({ children }) => {

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const context = {
    userLoggedIn,
    setUserLoggedIn
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;

}

export default ContextProvider;
