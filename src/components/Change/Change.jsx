import './Change.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { equal } from 'assert';

//import { load } from 'actions/auth';

export class Change extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordRepeat: '',
    };
  }

  handleChange = () => {
    const { userToEdit } = this.props;
    const id = userToEdit._id;
    let { password, passwordRepeat } = this.state;
    password = password.replace(/\s/g, '');
    passwordRepeat = passwordRepeat.replace(/\s/g, '');
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
        }),
      }).then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        console.log('succesful changing');
        alert('Ваш пароль успешно обнавлен.');
        return response.json();
      });
      //.then(data => {});
    }
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
    console.log({ [name]: value });
  };
  render() {
    const { passwordRepeat, password } = this.props;
    return (
      <>
        <div className="auth-wrap">
          <div className="auth">
            <h3>изменение пароля </h3>
            <input
              required
              onChange={this.handleTextChange}
              name="password"
              type="password"
              value={password}
              placeholder="Введите новый пароль"
            />
            <br />
            <input
              required
              onChange={this.handleTextChange}
              name="passwordRepeat"
              type="password"
              value={passwordRepeat}
              placeholder="Введите новый пароль еще раз"
            />
            <br />
            <button onClick={this.handleChange}>Изменить</button>
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
