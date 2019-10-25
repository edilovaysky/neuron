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
    utc: '',
    dateOfBirth: '',
    tel: '',
    email: '',
    gen: '',
    active: false,
    displayReg: false,
  };
  firstToCapital = str => {
    if (str) {
      str = str[0].toUpperCase() + str.substring(1);
      return str;
    }
  };
  handleRegIn = () => {
    const { isSelfReg, child, userToEdit, onReg } = this.props;
    let parent;
    let regPath = '';
    let {
      status,
      firstName,
      lastName,
      password,
      patronymic,
      utc,
      dateOfBirth,
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
      email = userToEdit.email;
    }
    if (!child || isSelfReg) {
      regPath = 'http://localhost:8888/reg';
      status = 'user';
    }

    firstName = firstName.replace(/\s/g, '').toLowerCase();
    firstName = this.firstToCapital(firstName);
    lastName = lastName.replace(/\s/g, '').toLowerCase();
    lastName = this.firstToCapital(lastName);
    if (patronymic) {
      patronymic = patronymic.replace(/\s/g, '').toLowerCase();
      patronymic = this.firstToCapital(patronymic);
    }
    password = password.replace(/\s/g, '');
    dateOfBirth = dateOfBirth.replace(/\s/g, '');
    tel = tel.replace(/\s/g, '');
    email = email.replace(/\s/g, '');

    if (
      !status == '' &&
      !firstName == '' &&
      !lastName == '' &&
      !password == '' &&
      !email == ''
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
          utc,
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
          if (data.status == 'user') {
            alert(
              `На Ваш email: ${data.email}, было отправлено письмо. Для АКТИВАЦИИ АККАУНТА следуйте инструкции в этом письме.`
            );
          }
        });
    }
    onReg();
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
      utc,
      dateOfBirth,
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

                {!child && !isSelfReg && (
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
                <span>выбирете часовой пояс:</span>
                <select name="utc" onChange={this.handleTextChange}>
                  <option defaultValue>часовой пояс по Гринвичу</option>
                  <option value="-12">UTC(GTM) -12 </option>
                  <option value="-11">UTC(GTM) -11 </option>
                  <option value="-10">UTC(GTM) -10 </option>
                  <option value="-9">UTC(GTM) -9 (Анкоридж США)</option>
                  <option value="-8">UTC(GTM) -8 (Лос-Анжелес)</option>
                  <option value="-7">UTC(GTM) -7 (Денвер США)</option>
                  <option value="-6">UTC(GTM) -6 (Далас США)</option>
                  <option value="-5">UTC(GTM) -5 (Торонто)</option>
                  <option value="-4">UTC(GTM) -4 (Боливия)</option>
                  <option value="-3">UTC(GTM) -3 (Бразилия)</option>
                  <option value="-2">UTC(GTM) -2 </option>
                  <option value="-1">UTC(GTM) -1 (Азорские острова)</option>
                  <option value="0">UTC(GTM) 0 (Гринвич) </option>
                  <option value="1">UTC(GTM) +1 (Германия)</option>
                  <option value="2">UTC(GTM) +2 (Киев) </option>
                  <option value="3">UTC(GTM) +3 (Москва) </option>
                  <option value="4">UTC(GTM) +4 (Самара) </option>
                  <option value="5">UTC(GTM) +5 (Ташкент)</option>
                  <option value="6">UTC(GTM) +6 (Астана)</option>
                  <option value="7">UTC(GTM) +7 (Банкок)</option>
                  <option value="8">UTC(GTM) +8 (Китай)</option>
                  <option value="9">UTC(GTM) +9 (Япония)</option>
                  <option value="10">UTC(GTM) +10 (Сидней)</option>
                  <option value="11">UTC(GTM) +11 (Новая Каледония)</option>
                  <option value="12">UTC(GTM) +12 (Новая Зеландия)</option>
                </select>
                <br />
                {!isSelfReg && (
                  <>
                    <span>укажите год обучения:</span>
                    <select name="???" onChange={this.handleTextChange}>
                      <option defaultValue>выбирете год обучения</option>
                      <option value="1"> 1 год обучения (1-й класс)</option>
                      <option value="2"> 2 год обучения (2-й класс)</option>
                      <option value="3"> 3 год обучения (3-й класс)</option>
                      <option value="4"> 4 год обучения (4-й класс)</option>
                    </select>
                    <br />
                  </>
                )}
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
                    <span>* email:</span>
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
