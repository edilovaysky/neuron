import './Auth.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { PassRecover } from 'components/PassRecover';
import { load } from 'actions/auth';

class AuthUnmounted extends Component {
  state = {
    displayParent: false,
    displayChild: false,
    parent: '',
    child: '',
    displayPassRecover: false,
  };

  handleSignIn = () => {
    const { authUser, onSuccess } = this.props;
    authUser(
      this.state.email,
      this.state.firstName,
      this.state.lastName,
      this.state.password
    );
    setTimeout(() => {
      onSuccess();
    }, 500);
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleChild = () => {
    this.setState({
      displayChild: !this.state.displayChild,
      displayParent: false,
      child: '-active',
      parent: '',
    });
  };

  handleParent = () => {
    this.setState({
      displayParent: !this.state.displayParent,
      displayChild: false,
      parent: '-active',
      child: '',
    });
  };

  handleForgetPass = () => {
    this.setState({
      displayPassRecover: !this.state.displayPassRecover,
      displayChild: false,
      displayParent: false,
    });
  };

  handlePassRecRequest = () => {
    this.setState({
      displayPassRecover: false,
    });
  };

  render() {
    const { email, firstName, lastName, password } = this.props;
    const {
      displayParent,
      displayChild,
      parent,
      child,
      displayPassRecover,
    } = this.state;
    const isSelfReg = true;
    return (
      <>
        <div className="auth-wrap">
          <div className="auth">
            <div className="auth-toggle">
              <h2
                className={`auth-toggle-h${parent}`}
                onClick={this.handleParent}
              >
                Родитель
              </h2>
              <h2
                className={`auth-toggle-h${child}`}
                onClick={this.handleChild}
              >
                Ученик
              </h2>
            </div>

            {displayChild && (
              <>
                <span>вход ученика: </span>
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
                <br />{' '}
              </>
            )}
            {displayParent && (
              <>
                <span>вход родителя: </span>
                <input
                  required
                  onChange={this.handleTextChange}
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Введите свой email"
                />
                <br />
              </>
            )}
            {(displayChild || displayParent) && (
              <>
                {' '}
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
              </>
            )}
            {displayParent && (
              <p className="forget-pass" onClick={this.handleForgetPass}>
                Вы забыли пароль??
              </p>
            )}
            {displayPassRecover && (
              <PassRecover onRequest={this.handlePassRecRequest} />
            )}
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
  return {
    user: state.userAuth.entries,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    authUser: (email, firstName, lastName, password) =>
      dispatch(load(email, firstName, lastName, password)),
  };
}

export const Auth = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthUnmounted);
