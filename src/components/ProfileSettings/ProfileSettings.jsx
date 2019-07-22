import './ProfileSettings.scss';

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export class ProfileSettings extends Component {
  state = {
    token: localStorage.getItem('token'),
    name: localStorage.getItem('name'),
  };

  handleSignOut = event => {
    this.setState({ token: '', name: '' }, () => {
      localStorage.setItem('token', '');
      localStorage.setItem('name', '');
      localStorage.setItem('id', '');
    });
    event.preventDefault();
    return <Redirect to="/auth" />;
  };
  render() {
    const { name, token } = this.state;
    return (
      <div className="profile-user-settings">
        <h1 className="profile-user-name">Привет {name}</h1>
        <button className="btn profile-edit-btn">РЕДАКТИРОВАТЬ</button>
        <button
          className="btn profile-settings-btn"
          aria-label="profile settings"
        >
          <i className="fas fa-cog" aria-hidden="true" />
        </button>
        <button className="btn profile-edit-btn" onClick={this.handleSignOut}>
          ВЫХОД
        </button>
      </div>
    );
  }
}
ProfileSettings.propTypes = {
  name: PropTypes.string,
};
