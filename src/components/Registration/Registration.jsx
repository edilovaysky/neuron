import './Registration.scss';

import React, { Component } from 'react';

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
          alert('Регистрация прошла успешно.');
          return response.json();
        })
        .then(data => {});
    }
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { firstName, lastName, password } = this.state;
    const { adminStatus } = this.props;
    return (
      <>
        <div className="auth-wrap">
          <div className="auth">
            <h3>Регистрация пользователей</h3>
            <i>Все поля обязательны к заполнению.</i>
            <select name="status" onChange={this.handleTextChange}>
              <option defaultValue>
                выберите статус регистрации пользователя
              </option>
              <option value="user">Ученик</option>
              <option value="teacher">Учитель</option>
              {adminStatus == 'esquire' && (
                <option value="admin">Администратор</option>
              )}
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
      </>
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
