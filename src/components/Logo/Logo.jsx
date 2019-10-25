import './Logo.scss';

import React from 'react';

export class Logo extends React.Component {
  render() {
    return (
      <li className="logo">
        <img src="../../../src/assets/logo.png" alt="Neuron-logo" />
      </li>
    );
  }
}
