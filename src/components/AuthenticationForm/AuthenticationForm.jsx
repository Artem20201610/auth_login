import React, { useState } from 'react';

import 'bulma';
import './AuthenticationForm.scss';

export const AuthenticationForm = ({ request, status, statusText, resetStatus }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ firstName, setFirstName ] = useState('');
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
      You successfully registered
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

  const handleChange = (value, action) => {
    action(value);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await request({
      email,
      password,
      confirmPassword,
      firstName
    }, 'register-user');
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
        <h1 className="subtitle is-2">Authentication</h1>
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
        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input
          type="password"
          id="confirmPassword"
          name="password"
          className="input"
          value={confirmPassword}
          onChange={({ target }) => {
            handleChange(target.value, setConfirmPassword);
          }}
          placeholder="Confirm Password"
          required
        >
        </input>
        <label htmlFor="firstName">First Name: </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="input"
          value={firstName}
          onChange={({ target }) => {
            handleChange(target.value, setFirstName);
          }}
          placeholder="First Name"
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
