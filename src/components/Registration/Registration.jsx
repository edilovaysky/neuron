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
    gen: '',
    active: false,
    displayReg: false,
  };
  handleRegIn = () => {
    const { isSelfReg, child, userToEdit, reAuth } = this.props;
    let parent;
    let regPath = '';
    let {
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
      gen,
      active,
    } = this.state;
    if (child) {
      status = 'child';
      parent = userToEdit._id;
      regPath = 'http://localhost:8888/reg-child';
      active = true;
    }
    if (!child) {
      regPath = 'http://localhost:8888/reg';
    }

    firstName = firstName.replace(/\s/g, '');
    lastName = lastName.replace(/\s/g, '');
    password = password.replace(/\s/g, '');
    patronymic = patronymic.replace(/\s/g, '');
    city = city.replace(/\s/g, '');
    dateOfBirth = dateOfBirth.replace(/\s/g, '');
    tel = tel.replace(/\s/g, '');
    email = email.replace(/\s/g, '');

    if (
      !status == '' &&
      !firstName == '' &&
      !lastName == '' &&
      !password == ''
    ) {
      fetch(regPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          active,
          status,
          firstName,
          lastName,
          password,
          patronymic,
          city,
          dateOfBirth,
          tel,
          email,
          gen,
          isSelfReg,
          parent,
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
        .then(data => {
          //this.handleSendMail()
        });
    }
    reAuth();
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  handleCheckActive = () => {
    this.setState({ active: !this.state.active });
  };
  handleDisplayReg = () => {
    this.setState({ displayReg: !this.state.displayReg });
  };

  render() {
    const {
      firstName,
      lastName,
      password,
      patronymic,
      city,
      dateOfBirth,
      parentName,
      tel,
      email,
      displayReg,
    } = this.state;
    const { adminStatus, isSelfReg, child } = this.props;
    //console.log(isSelfReg, child);

    return (
      <>
        <div className="reg-wrap">
          <div className="reg">
            {!child && (
              <h3 onClick={this.handleDisplayReg}>Регистрация пользователей</h3>
            )}
            {child && (
              <h3 onClick={this.handleDisplayReg}>Регистрация ребенка</h3>
            )}
            {displayReg && (
              <>
                <i>* поля обязательны к заполнению.</i>
                {!isSelfReg ||
                  (child && (
                    <div className="check-wrap">
                      <label className="switch-wrap">
                        <input
                          type="checkbox"
                          onChange={this.handleCheckActive}
                        />
                        <div className="switch"></div>
                      </label>
                      <p>* активен</p>
                    </div>
                  ))}

                {!child && (
                  <select name="status" onChange={this.handleTextChange}>
                    <option defaultValue>
                      * выберите статус регистрации пользователя
                    </option>
                    <option value="user">Ученик</option>
                    {!isSelfReg && <option value="teacher">Учитель</option>}
                    {adminStatus == 'esquire' && (
                      <option value="admin">Администратор</option>
                    )}
                  </select>
                )}
                <br />
                <span>* Имя:</span>
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
                <span>* Фамилия:</span>
                <input
                  required
                  onChange={this.handleTextChange}
                  name="lastName"
                  type="text"
                  value={lastName}
                  placeholder="Фамилия"
                />
                <br />
                <span>укажите пол</span>
                <select name="gen" onChange={this.handleTextChange}>
                  <option defaultValue>пол</option>
                  <option value="m">муж</option>
                  <option value="f">жен</option>
                </select>
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
                <span>часовой пояс:</span>
                <input
                  required
                  onChange={this.handleTextChange}
                  name="city"
                  type="text"
                  value={city}
                  placeholder="часовой пояс"
                />
                <br />
                {/* <span>ФИО родителя или родителей:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="parentName"
              type="text"
              value={parentName}
              placeholder="ФИО родителя"
            />
            <br /> */}
                {!child && (
                  <>
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
                  </>
                )}
                {!child && (
                  <>
                    <span>email:</span>
                    <input
                      required
                      onChange={this.handleTextChange}
                      name="email"
                      type="email"
                      value={email}
                      placeholder="email"
                    />
                    <br />
                  </>
                )}
                <span>* пароль для входа в личный кабинет:</span>
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
              </>
            )}
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
