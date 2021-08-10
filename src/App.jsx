import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { AuthenticationForm } from './components/AuthenticationForm';
import { LoginForm } from './components/LoginForm';

import 'bulma';
import './App.scss';

const URL = "http://161.35.157.168:4000/auth/";

export const App = () => {
  const [ status, setStatus ] = useState(null);
  const [ statusText, setStatusText ] = useState('');
  const [ error, setError ] = useState(null);

  const resetError = () => {
    setError(null);
  };

  const errorMessage = error && (
    <article class="message is-danger">
    <div class="message-header">
      <p>Error</p>
      <button
        class="delete"
        aria-label="delete"
        onClick={resetError}
      ></button>
    </div>
    <div class="message-body">
      An error occured {`${error}`}
    </div>
  </article>);

  const resetStatus = () => {
    setStatus(null);
    setStatusText('');
  };

  const request = async (requestBody, endpoint) => {
    try {
      const response = await fetch(URL + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      setStatus(response.status);
      setStatusText(response.statusText);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <header>
        <Navigation />
      </header>
      <section className="section">
        <div className="container">
          <h1 className="title is-2">Authentication and Login Form</h1>
          {errorMessage}
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
