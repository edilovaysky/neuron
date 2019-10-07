import './Auth.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Registration } from 'components/Registration';
import { TestMail } from 'components/Registration/TestMail';
import { load } from 'actions/auth';

class AuthUnmounted extends Component {
  state = {
    displayReg: false,
  };

  handleSignIn = () => {
    const { authUser, onSuccess } = this.props;
    authUser(this.state.firstName, this.state.lastName, this.state.password);
    setTimeout(() => {
      onSuccess();
    }, 500);
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleReg = () => {
    this.setState({ displayReg: !this.state.displayReg });
  };

  render() {
    const { firstName, lastName, password } = this.props;
    const { displayReg } = this.state;
    const isSelfReg = true;
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

            <div className="auth-menu-wrap">
              <ul className="auth-menu">
                <li>
                  <p onClick={this.handleReg}>регистрация</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="auth-reg-wrap">
          {displayReg && <Registration isSelfReg={isSelfReg} />}
          <TestMail />
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
