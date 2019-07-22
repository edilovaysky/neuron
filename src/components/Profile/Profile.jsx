import './Profile.scss';

import React, { Component } from 'react';
//import { ProfileImg } from '../ProfileImg';
import { ProfileSettings } from '../ProfileSettings';

export class Profile extends Component {
  state = {
    name: localStorage.getItem('name'),
  };
  render() {
    const { image, id } = this.props;
    const { name } = this.state;
    return (
      <div className="container">
        <div className="profile">
          {/* <ProfileImg image={image} id={id} /> */}
          <ProfileSettings name={name} id={id} />
        </div>
      </div>
    );
  }
}
