import './VideoIcon.scss';

import React, { Component } from 'react';

export class VideoIcon extends Component {
  render() {
    return (
      <div className="gallery-item-type">
        <span className="visually-hidden">Video</span>
        <i className="fas fa-video" aria-hidden="true" />
      </div>
    );
  }
}
