import './Auth.scss';

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { load } from 'actions/auth';

class AuthUnmount extends Component {
  handleSignIn = () => {
    console.log(this.state.password);
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const password = this.state.password;
    this.props.loadUser(firstName, lastName, password);
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { firstName, lastName, password } = this.props;
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

const mapStateToProps = (state, props) => {
  return {
    user: state.user.entries,
    loading: state.user.loading,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadUser: () => load(dispatch),
  };
};

export const Auth = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthUnmount);

Auth.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
};
