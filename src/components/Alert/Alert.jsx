import './Alert.scss';

import React, { Component } from 'react';

export class Alert extends Component {
  render() {
    return (
      <div className="alert-wrap">
        <p className="alert-message">ALERT!!!</p>
      </div>
    );
  }
}
