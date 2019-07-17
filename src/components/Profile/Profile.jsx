import './Profile.scss';

import React, { Component } from 'react';
import { profile } from '../userprofile';
import { ProfileImg } from '../ProfileImg';
import { ProfileSettings } from '../ProfileSettings';
import { ProfileStats } from '../ProfileStats';
import { ProfileBio } from '../ProfileBio';

export class Profile extends Component {
  render() {
    const { image, name, id } = this.props;
    return (
      <div className="container">
        <div className="profile">
          <ProfileImg image={image} id={id} />
          <ProfileSettings name={name} id={id} />
          {/* <ProfileStats {...profile} />
          <ProfileBio {...profile} /> */}
        </div>
      </div>
    );
  }
}
