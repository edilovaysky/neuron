import './Likes.scss';

import React, { Component } from 'react';

export class Likes extends Component {
  render() {
    const { likes } = this.props;
    return (
      <li className="gallery-item-likes">
        <span className="visually-hidden">Likes:</span>
        <i className="fas fa-heart" aria-hidden="true" /> {likes}
      </li>
    );
  }
}
