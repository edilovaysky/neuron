import './OfficeSideBar.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class OfficeSideBar extends Component {
  render() {
    return (
      <>
        <div className="side-nav-bar">
          <ul>
            <li className="logo">
              <img src="../../../src/assets/logo.png" alt="Neuron-logo" />
            </li>
            <li className="side-btn">
              <a href="/my-office">мои классы</a>
            </li>
            <li className="side-btn">
              <a href="my-office">мои курсы</a>
            </li>
            <li className="side-btn">
              <a href="my-office">мой тьютор</a>
            </li>
            <li className="side-btn">
              <a href="my-office">мой репититор</a>
            </li>
          </ul>
        </div>
      </>
    );
  }
}
