import './AuthMenu.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class AuthMenu extends Component {
  render() {
    return (
      <div className="auth-menu-wrap">
        <ul className="auth-menu">
          <li>
            <Link to="/auth">
              <p>авторизация</p>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
