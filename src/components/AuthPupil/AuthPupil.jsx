import './AuthPupil.scss';

import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

export class AuthPupil extends Component {
  state = {
    username: '',
    studyGroup: '',
  };
  handleSignInPupil = () => {
    const { username, studyGroup } = this.state;
    const { onSuccess, handleUser } = this.props;
    console.log(this.state);
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
    const { onSuccess, handleUser } = this.props;
    return (
      <Fragment>
        <div className="auth">
          <div>
            <h3>Авторизация учеников</h3>
            <input
              onChange={this.handleTextChange}
              name="username"
              type="text"
              value={username}
              placeholder="Введите ваше имя"
            />
            <br />
            <input
              onChange={this.handleTextChange}
              name="studyGroup"
              type="text"
              value={studyGroup}
              placeholder="Введите ваше класс"
            />
            <br />
            <button onClick={this.handleSignInPupil}>Sign In</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

AuthPupil.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
};
