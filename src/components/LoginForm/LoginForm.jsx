import React, { useState } from 'react';

import 'bulma';

export const LoginForm = ({ request, status, statusText, resetStatus }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const successMessage = (status === 201) &&
  (<article class="message is-success">
    <div class="message-header">
      <p>Success</p>
      <button
        class="delete"
        aria-label="delete"
        onClick={resetStatus}
      ></button>
    </div>
    <div class="message-body">
      You successfully logged
    </div>
  </article>);
  const errorMessage = (status && status !== 201) &&
  (<article class="message is-danger">
    <div class="message-header">
      <p>Danger</p>
      <button
        class="delete"
        aria-label="delete"
        onClick={resetStatus}
      ></button>
    </div>
    <div class="message-body">
      An error occured {`Status: ${status}\n Status text: ${statusText}`}
    </div>
  </article>);

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleChange = (stateField, setStateField) => {
    setStateField(stateField);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await request({
      email,
      password
    }, 'login');
    resetForm();
  };

  return (
    <>
      {successMessage}
      {errorMessage}
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <h1 className="subtitle is-2">Login Form</h1>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          className="input"
          value={email}
          onChange={({ target }) => {
            handleChange(target.value, setEmail);
          }}
          placeholder="Email"
          required
        ></input>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          className="input"
          value={password}
          onChange={({ target }) => {
            handleChange(target.value, setPassword);
          }}
          placeholder="Password"
          required
        >
        </input>
        <button
          type="submit"
          className="button is-primary"
        >
          Submit
        </button>
      </form>
    </>
  );
};
