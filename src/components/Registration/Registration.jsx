import './Registration.scss';

import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

export class Registration extends Component {
  state = {
    status: '',
    firstName: '',
    lastName: '',
    password: '',
  };
  handleRegIn = () => {
    const { status, firstName, lastName, password } = this.state;
    const { onSuccess, handleUser } = this.props;
    console.log(this.state);
    if (
      !status == '' &&
      !firstName == '' &&
      !lastName == '' &&
      !password == ''
    ) {
      fetch('http://localhost:8888/reg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          firstName,
          lastName,
          password,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          console.log('succesful registration');
          return response.json();
        })
        .then(data => {
          onSuccess(data.token);
          handleUser(
            data._id,
            data.status,
            data.firstName,
            data.lastName,
            data.password
          );
        });
    }
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { status, firstName, lastName, password } = this.state;
    return (
      <Fragment>
        <h1 className="auth-h1">Добро пожаловать на страницу регистрации</h1>
        <div className="auth-wrap">
          <div className="auth">
            <h3>Регистрация пользователей</h3>
            <select name="status" onChange={this.handleTextChange}>
              <option disabled>Выберите статус регистрации</option>
              <option value="user">Ученик</option>
              <option value="teacher">Учитель</option>
              <option value="admin">Администратор</option>
            </select>
            <br />
            <input
              required
              onChange={this.handleTextChange}
              name="firstName"
              type="text"
              value={firstName}
              placeholder="Введите ваше Имя"
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
              placeholder="Введите ваш пароль"
            />
            <br />
            <button onClick={this.handleRegIn}>отправить</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

Registration.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  studyGroup: PropTypes.string,
  teacherName: PropTypes.string,
  teacherLastName: PropTypes.string,
  teacherPassword: PropTypes.string,
};
