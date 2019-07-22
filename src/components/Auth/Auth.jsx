import './Auth.scss';

import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

import { AuthPupil } from 'components/AuthPupil';

export class Auth extends Component {
  state = {
    status: '',
    firstName: '',
    lastName: '',
    password: '',
  };
  handleSignIn = () => {
    const { statis, firstName, lastName, studyGroup, password } = this.state;
    const { onSuccess, handleUser } = this.props;
    console.log(this.state);
    fetch('http://localhost:8888/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, firstName, lastName, password }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json();
      })
      .then(data => {
        onSuccess(data.token);
        handleUser(
          data.user._id,
          data.user.status,
          data.user.firstName,
          data.user.lastName,
          localStorage.setItem('id', data.user._id)
        );
      });
    localStorage.setItem('name', `${firstName}  ${lastName}`);
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { firstName, lastName, password } = this.state;
    return (
      <Fragment>
        <div className="auth-wrap">
          <div className="auth">
            <h3>Авторизация</h3>
            <input
              required
              onChange={this.handleTextChange}
              name="firstName"
              type="text"
              value={firstName}
              placeholder="Введите ваше имя"
            />
            <br />
            <input
              required
              onChange={this.handleTextChange}
              name="lastName"
              type="text"
              value={lastName}
              placeholder="Введите вашу Фамилию"
            />
            <br />
            <input
              required
              onChange={this.handleTextChange}
              name="password"
              type="password"
              value={password}
              placeholder="Введите свой пароль"
            />
            <br />
            <button onClick={this.handleSignIn}>Войти</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

Auth.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
};
