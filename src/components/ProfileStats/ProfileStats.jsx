import './ProfileStats.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ProfileStats extends Component {
  state = { profile };
  render() {
    const { posts, followers, following } = this.state;
    return (
      <div className="profile-stats">
        <ul>
          <li>
            <span className="profile-stat-count">{posts}</span> posts
          </li>
          <li>
            <span className="profile-stat-count">{followers}</span> followers
          </li>
          <li>
            <span className="profile-stat-count">{following}</span> following
          </li>
        </ul>
      </div>
    );
  }
}
ProfileStats.propTypes = {
  posts: PropTypes.number,
  followers: PropTypes.number,
  following: PropTypes.number,
};
