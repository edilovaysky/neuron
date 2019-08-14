import React from 'react';
export const AdminSideBar = props => {
  return (
    <>
      <div className="side-nav-bar">
        <ul>
          <li className="logo">
            <img src="../../../src/assets/logo.png" alt="Neuron-logo" />
          </li>
          <li className="side-btn">
            <a href="/my-office">пользователи</a>
          </li>
          <li className="side-btn">
            <a href="my-office">классы</a>
          </li>
          <li className="side-btn">
            <a href="my-office">курсы</a>
          </li>
          <li className="side-btn">
            <a href="my-office">репетиторы</a>
          </li>
        </ul>
      </div>
    </>
  );
};
