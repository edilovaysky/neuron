import './Auth.scss';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

export class Auth extends Component {
  state = {
    username: '',
    studyGroup: '',
  };
  handleSignIn = () => {
    const { username, studyGroup } = this.state;
    const { onSuccess, handleUser } = this.props;
    fetch('http://localhost:8888/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, studyGroup }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json();
      })
      .then(data => {
        onSuccess(data.token);
        handleUser(data.user._id, data.user.studyGroup, data.user.firstName);
      });
  };
  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { username, studyGroup } = this.state;
    return (
      <div className="auth">
        <div>
          <input
            onChange={this.handleTextChange}
            name="username"
            type="text"
            value={username}
          />
          <br />
          <input
            onChange={this.handleTextChange}
            name="studyGroup"
            type="text"
            value={studyGroup}
          />
          <br />
          <button onClick={this.handleSignIn}>Sign In</button>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
};
