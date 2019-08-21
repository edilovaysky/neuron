import './Registration.scss';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

export class Registration extends Component {
  state = {
    status: '',
    firstName: '',
    lastName: '',
    password: '',
    patronymic: '',
    city: '',
    dateOfBirth: '',
    parentName: '',
    tel: '',
    email: '',
  };
  handleRegIn = () => {
    const {
      status,
      firstName,
      lastName,
      password,
      patronymic,
      city,
      dateOfBirth,
      parentName,
      tel,
      email,
    } = this.state;
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
          patronymic,
          city,
          dateOfBirth,
          parentName,
          tel,
          email,
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
    console.log({ [name]: value });
  };
  render() {
    const {
      status,
      firstName,
      lastName,
      password,
      patronymic,
      city,
      dateOfBirth,
      parentName,
      tel,
      email,
    } = this.state;
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
            <span>Имя:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="firstName"
              type="text"
              value={firstName}
              placeholder="Имя"
            />
            <br />
            <span>Отчество:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="patronymic"
              type="text"
              value={patronymic}
              placeholder="Отчество"
            />
            <br />
            <span>Фамилия:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="lastName"
              type="text"
              value={lastName}
              placeholder="Фамилия"
            />
            <br />
            <span>дата рождения:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="dateOfBirth"
              type="text"
              value={dateOfBirth}
              placeholder="дата рождения в формате дд.мм.гггг"
            />
            <br />
            <span>место проживания:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="city"
              type="text"
              value={city}
              placeholder="место проживания"
            />
            <br />
            <span>ФИО родителя или родителей:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="parentName"
              type="text"
              value={parentName}
              placeholder="ФИО родителя"
            />
            <br />
            <span>телефон:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="tel"
              type="tel"
              value={tel}
              placeholder="телефон"
            />
            <br />
            <span>email родителей:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="email"
              type="email"
              value={email}
              placeholder="email"
            />
            <br />
            <span>пароль для входа в личный кабинет:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="password"
              type="password"
              value={password}
              placeholder="пароль"
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
