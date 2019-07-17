import './ProfileBio.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ProfileBio extends Component {
  render() {
    const realname = this.props[0].realname;
    const desc = this.props.user.bio;
    return (
      <div className="profile-bio">
        <p>
          <span className="profile-real-name">{realname}</span> {desc}
        </p>
      </div>
    );
  }
}
ProfileBio.propTypes = {
  realname: PropTypes.string,
  desc: PropTypes.string,
};
