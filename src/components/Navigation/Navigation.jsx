import React from 'react';
import { NavLink } from 'react-router-dom';

import 'bulma';

export const Navigation = () => (
  <nav className="navbar">
    <NavLink
      to="/auth"
      className="navbar-item is-tab"
      activeClassName="is-active"
      exact
    >
      Authenticate
    </NavLink>
    <NavLink
      to="/login"
      className="navbar-item is-tab"
      activeClassName="is-active"
      exact
    >
      Login
    </NavLink>
  </nav>
);
