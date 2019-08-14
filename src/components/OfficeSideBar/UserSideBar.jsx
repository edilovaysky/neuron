import React from 'react';
export const UserSideBar = props => {
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
            <a href="my-office">мой репетитор</a>
          </li>
        </ul>
      </div>
    </>
  );
};
