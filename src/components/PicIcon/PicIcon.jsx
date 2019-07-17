import './PicIcon.scss';

import React, { Component } from 'react';

export class PicIcon extends Component {
  render() {
    return (
      <div className="gallery-item-type">
        <span className="visually-hidden">Gallery</span>
        <i className="fas fa-clone" aria-hidden="true" />
      </div>
    );
  }
}
