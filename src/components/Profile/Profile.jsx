import './Profile.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { ProfileImg } from '../ProfileImg';
import { ProfileSettings } from '../ProfileSettings';

export class Profile extends Component {
  componentWillMount() {
    this.setState({
      token: this.props.user.token,
    });
  }
  render() {
    const { token } = this.state;
    return (
      <div className="container">
        {token && (
          <div className="profile">
            <ProfileSettings />
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    user: state.userAuth.entries,
  };
}

Profile = connect(mapStateToProps)(Profile);
