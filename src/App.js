import React from 'react';
import Client from './components/Client.jsx';
import ClientContainer from './components/ClientContainer.jsx';
function App() {
  function isTrainerview() {
    return true;
    return false;
  }
  return (
    <div>
      Nav Bar Place Holder
      {isTrainerview() ? <ClientContainer /> : <Client />}
    </div>
  );
}
export default App;
