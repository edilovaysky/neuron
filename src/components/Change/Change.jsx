import './Change.scss';

import React, { Component } from 'react';
//import { connect } from 'react-redux';

import PropTypes from 'prop-types';
//import { equal } from 'assert';

//import { load } from 'actions/auth';

export class Change extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordRepeat: '',
      oldPassword: '',
      displayPassword: false,
    };
  }

  handleChange = () => {
    const { userToEdit } = this.props;
    const id = userToEdit._id;

    let { password, passwordRepeat } = this.state;

    password = password.replace(/\s/g, '');
    passwordRepeat = passwordRepeat.replace(/\s/g, '');

    const passChange = true;
    if (!password && !passwordRepeat) {
      alert('Вы не ввели пароли');
      return;
    }
    if (password !== passwordRepeat) {
      alert('Вы ввели не одинаковые пароли.');
    }
    if (password === passwordRepeat) {
      fetch(`http://localhost:8888/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          passChange,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          console.log('succesful changing');
          alert('Ваш пароль успешно обнавлен.');
          return response.json();
        })
        .then(data => {
          const { onSuccessPassChange } = this.props;
          if (onSuccessPassChange !== 'undefined') {
            onSuccessPassChange();
          }
        });
    }
  };

  handleDispPass = () => {
    this.setState({ displayPassword: !this.state.displayPassword });
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  handleReset = () => {
    this.setState({ password: '', passwordRepeat: '' });
  };
  render() {
    const { passwordRepeat, password } = this.state;
    const { displayPassword } = this.state;
    return (
      <>
        <div className="change-wrap">
          <div className="change">
            <h3>изменение пароля </h3>
            <span onClick={this.handleDispPass}>показать пароли</span>

            <input
              required
              onChange={this.handleTextChange}
              name="password"
              type="password"
              value={password}
              placeholder="Введите новый пароль"
            />
            {displayPassword && (
              <span>
                <i>пароль: </i> {password}
              </span>
            )}
            <br />
            <input
              required
              onChange={this.handleTextChange}
              name="passwordRepeat"
              type="password"
              value={passwordRepeat}
              placeholder="Введите новый пароль еще раз"
            />
            {displayPassword && (
              <span>
                <i>повтор пароля: </i>
                {passwordRepeat}
              </span>
            )}
            <br />
            <div className="button-wrapper">
              <button onClick={this.handleChange}>Изменить</button>
              <button onClick={this.handleReset}>Очистить</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
Change.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
};
