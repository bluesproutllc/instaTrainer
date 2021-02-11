import React, { Fragment, useState, useEffect } from 'react';
function Login(props) {
  const login = () => {
    console.log('login was clicked');
    fetch('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({
        userType: 'trainer',
        username: 'trainer1',
        password: '1234',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.text())
      .then((response) => {
        console.log('response from login method: ', response);
        const { history } = props;
        history.push('/dashboard');
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login;