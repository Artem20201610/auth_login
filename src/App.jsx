import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthenticationForm } from './components/AuthenticationForm';
import { LoginForm } from './components/LoginForm';

import 'bulma';
import './App.scss';

const URL = "https://161.35.157.168:4000/auth/";

export const App = () => {
  const [ status, setStatus ] = useState(null);
  const [ statusText, setStatusText ] = useState('');

  const resetStatus = () => {
    setStatus(null);
    setStatusText('');
  }

  const request = async (requestBody, endpoint) => {
    console.log(URL + endpoint);

    const response = await fetch(URL + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    setStatus(response.status);
    setStatusText(response.statusText);
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title is-2">Authentication and Login Form</h1>
          <Switch>
            <Route path="/auth">
              <AuthenticationForm
                request={request}
                status={status}
                statusText={statusText}
                resetStatus={resetStatus}
              />
            </Route>
            <Route path="/login">
              <LoginForm
                request={request}
                status={status}
                statusText={statusText}
                resetStatus={resetStatus}
              />
            </Route>

            <Redirect path="/" to="/login"/>
          </Switch>
        </div>
      </section>
    </>
  );
}
