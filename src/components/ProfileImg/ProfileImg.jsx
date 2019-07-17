import './ProfileImg.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ProfileImg extends Component {
  render() {
    const image = this.props;
    return (
      <div className="profile-image">
        <img src={image.image} alt="avatar" />
      </div>
    );
  }
}
ProfileImg.propTypes = {
  image: PropTypes.string,
};
