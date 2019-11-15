import './MainMenu.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from 'components/Logo';

export class MainMenu extends Component {
  render() {
    return (
      <div className="main-menu-wrap">
        <ul className="main-menu">
          <Logo />
          <li>
            <Link to="/">
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
          <li>
            <Link to="/feedback">
              <p>написать</p>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
