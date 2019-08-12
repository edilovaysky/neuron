import './Auth.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { load } from 'actions/auth';

class AuthUnmounted extends Component {
  handleSignIn = () => {
    const { authUser, onSuccess } = this.props;
    authUser(this.state.firstName, this.state.lastName, this.state.password);
    /*  setTimeout(() => {
      onSuccess();
    }, 1000); */
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { firstName, lastName, password } = this.props;
    return (
      <>
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
      </>
    );
  }
}

AuthUnmounted.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
};
function mapStateToProps(state, props) {
  console.log(state);
  return {
    user: state.userAuth.entries,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    authUser: (firstName, lastName, password) =>
      dispatch(load(firstName, lastName, password)),
  };
}

export const Auth = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthUnmounted);
