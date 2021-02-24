import React, { Fragment, useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import ClientCard from './ClientCard.jsx';

function ClientsContainer({clientsInfo, setClientInfo}) {
  let clientCards = null;
  // if clientsInfo is an array, create an array of clientCards 
  if (Array.isArray(clientsInfo)) clientCards = clientsInfo.map((clientInfo) => {
    return (
      <Link key={clientInfo.client_id} to={`myclients/${clientInfo.client_id}`}>
        <ClientCard clientInfo={clientInfo} />
      </Link>
    );
  });
  return (
    <div>
      <p>Click on a client to edit their workout plan.</p>
      {/* //TODO: if clientCards is null, render 'still loading'. currently nothing will render */}
      {clientCards && (clientCards.length ? clientCards : <p>You have no clients yet.</p>)}
    </div>
  )
}

export default ClientsContainer;