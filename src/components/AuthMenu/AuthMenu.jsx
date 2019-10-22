import './AuthMenu.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from 'components/Logo';

export class AuthMenu extends Component {
  render() {
    return (
      <div className="auth-menu-wrap">
        <ul className="auth-menu">
          <Logo />
          <li>
            <Link to="/home">
              <p>главная</p>
            </Link>
          </li>
          <li>
            <Link to="/auth">
              <p>авторизация</p>
            </Link>
          </li>
          <li>
            <Link to="/reg">
              <p>регистрация</p>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
