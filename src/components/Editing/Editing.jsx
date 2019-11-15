import './Editing.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:8888');
import { DragAndDrop } from 'components/DragAndDrop';
import { reAuth } from 'actions/auth';

import PropTypes from 'prop-types';

export class EditingStart extends Component {
  constructor(props) {
    super(props);
    const { userToEdit } = this.props;

    this.state = {
      status: userToEdit.status,
      firstName: '',
      lastName: '',
      patronymic: '',
      utc: '',
      dateOfBirth: '',
      parentName: '',
      tel: '',
      email: '',
      gen: '',
      active: userToEdit.active,
      comment: '',
      child: false,
      displayEdit: false,
      prevData: {
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        patronymic: userToEdit.patronymic,
        utc: userToEdit.utc,
        dateOfBirth: userToEdit.dateOfBirth,
        parentName: userToEdit.parentName,
        tel: userToEdit.tel,
        email: userToEdit.email,
        gen: userToEdit.gen,
        active: userToEdit.active,
        comment: userToEdit.comment,
      },
    };
    /*   String.prototype.firstToCapital = () => {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }; */
  }

  firstToCapital = str => {
    if (str) {
      str = str[0].toUpperCase() + str.substring(1);
      return str;
    }
  };
  componentDidMount() {
    const { userToEdit } = this.props;
    if (userToEdit.status == 'child') {
      this.setState({ child: true });
    }
  }

  handleEdit = () => {
    const { userToEdit } = this.props;
    const id = userToEdit._id;
    //const active = userToEdit.active;

    let {
      active,
      comment,
      status,
      firstName,
      lastName,
      patronymic,
      utc,
      dateOfBirth,
      tel,
      email,
      gen,
      prevData,
    } = this.state;

    let url;
    let needToAppove = false;
    let responseMessage;
    //console.log(firstName, 'prevData:  ', prevData.firstName);
    if (
      (firstName == '' && lastName == '' && dateOfBirth == '') ||
      userToEdit.status !== 'child'
    ) {
      //console.log('to user editing worked');
      url = `http://localhost:8888/users/${id}`;
      responseMessage = 'Учетная запись успешно отредактирована.';
    }
    if (!firstName == '' || !lastName == '' || !dateOfBirth == '') {
      //console.log('to admin approve worked');
      needToAppove = true;
    }

    if (comment == '') {
      comment = prevData.comment;
    }
    if (firstName == '') {
      firstName = prevData.firstName;
    }
    if (lastName == '') {
      lastName = prevData.lastName;
    }
    if (patronymic == '') {
      patronymic = prevData.patronymic;
    }
    if (utc == '') {
      utc = prevData.utc;
    }
    if (dateOfBirth == '') {
      dateOfBirth = prevData.dateOfBirth;
    }
    if (tel == '') {
      tel = prevData.tel;
    }
    if (email == '') {
      email = prevData.email;
    }
    if (gen == '') {
      gen = prevData.gen;
    }

    firstName = firstName.replace(/\s/g, '').toLowerCase();
    firstName = this.firstToCapital(firstName);
    lastName = lastName.replace(/\s/g, '').toLowerCase();
    lastName = this.firstToCapital(lastName);
    if (patronymic) {
      patronymic = patronymic.replace(/\s/g, '').toLowerCase();
      patronymic = this.firstToCapital(patronymic);
    }

    if (tel) {
      tel = tel
        .replace(/\s/g, '')
        .replace(/\(/, '')
        .replace(/\)/, '');
    }
    if (email) {
      email = email.replace(/\s/g, '');
    }

    if (
      userToEdit.firstName == firstName &&
      userToEdit.patronymic == patronymic &&
      userToEdit.lastName == lastName &&
      userToEdit.active == active &&
      userToEdit.utc == utc &&
      userToEdit.dateOfBirth == dateOfBirth &&
      userToEdit.tel == tel &&
      userToEdit.email == email &&
      userToEdit.gen == gen
    ) {
      responseMessage = `Отредактируйте данные прежде чем нажать "отправить".`;
      alert(responseMessage);
      return;
    }
    if (url) {
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          active,
          status,
          firstName,
          lastName,
          patronymic,
          utc,
          dateOfBirth,
          tel,
          email,
          gen,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          console.log(responseMessage);
          alert(responseMessage);
          return response.json();
        })
        .then(data => {
          const { userReAuth } = this.props;
          const token = this.props.user.token;
          const { user } = data;
          console.log(userToEdit.status);
          if (userToEdit.status == 'user') {
            userReAuth({ token: token, user });
          }
        });
    }

    if (needToAppove && userToEdit.status == 'child') {
      const userId = id;
      const data = {
        userId,
        active,
        status,
        firstName,
        lastName,
        patronymic,
        utc,
        dateOfBirth,
        tel,
        email,
        gen,
        comment,
      };

      socket.emit('userToApprove', data);
      socket.on('userToApprove', data => {
        console.log(data);
      });
      responseMessage =
        'Изменение ожидает проверки аминистратора. Это может занять 24 часов.';
      alert(responseMessage);
    }
  };

  isUserActive = () => {
    if (this.props.userToEdit) {
      const { active } = this.props.userToEdit;

      if (active) {
        return (
          <div className="check-wrap">
            <label className="switch-wrap-edit">
              <input type="checkbox" onChange={this.handleCheckActive} />
              <div className="switch-edit"></div>
            </label>
            <p>* активен</p>
          </div>
        );
      } else {
        return (
          <div className="check-wrap">
            <label className="switch-wrap">
              <input type="checkbox" onChange={this.handleCheckActive} />
              <div className="switch"></div>
            </label>
            <p>* не активен</p>
          </div>
        );
      }
    }
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  handleCheckActive = () => {
    this.setState({ active: !this.state.active });
  };

  handelDisplayEdit = () => {
    this.setState({ displayEdit: !this.state.displayEdit });
  };
  render() {
    const {
      active,
      firstName,
      lastName,
      patronymic,
      comment,
      dateOfBirth,
      tel,
      email,
      child,
      displayEdit,
      prevData,
    } = this.state;

    const { userStatus, userToEdit } = this.props;

    const docType = 'udoc';
    let userId;
    let userGen;
    if (userToEdit) {
      userId = userToEdit._id;
      userGen = userToEdit.gen;
    }

    const isActive = this.isUserActive();
    return (
      <>
        <div className="editing-wrap">
          <div className="editing">
            {userStatus == 'admin' && !child && (
              <h3 onClick={this.handelDisplayEdit}>
                редактирование данных пользователя
              </h3>
            )}
            {userStatus == 'esquire' && !child && (
              <h3 onClick={this.handelDisplayEdit}>
                редактирование данных пользователя
              </h3>
            )}
            {userStatus == 'user' && (
              <h3 onClick={this.handelDisplayEdit}>редактирование данных</h3>
            )}
            {child && (
              <h3 onClick={this.handelDisplayEdit}>
                редактирование данных ученика
              </h3>
            )}
            {displayEdit && (
              <>
                <i>заполните подлежащие редактированию поля</i>
                {(userStatus == 'admin' && <>{isActive}</>) ||
                  (userStatus == 'esquire' && <>{isActive}</>)}
                <span>*Имя:</span>
                <input
                  required
                  onChange={this.handleTextChange}
                  name="firstName"
                  type="text"
                  value={firstName}
                  placeholder={prevData.firstName}
                />
                <br />
                <span>Отчество:</span>
                <input
                  required
                  onChange={this.handleTextChange}
                  name="patronymic"
                  type="text"
                  value={patronymic}
                  placeholder={prevData.patronymic}
                />
                <br />
                <span>*Фамилия:</span>
                <input
                  required
                  onChange={this.handleTextChange}
                  name="lastName"
                  type="text"
                  value={lastName}
                  placeholder={prevData.lastName}
                />
                <br />
                {!userGen && (
                  <>
                    {' '}
                    <span>укажите пол</span>
                    <select name="gen" onChange={this.handleTextChange}>
                      <option defaultValue>пол</option>
                      <option value="m">муж</option>
                      <option value="f">жен</option>
                    </select>
                  </>
                )}
                <span>*Дата рождения:</span>
                <input
                  required
                  onChange={this.handleTextChange}
                  name="dateOfBirth"
                  type="text"
                  value={dateOfBirth || ''}
                  placeholder={prevData.dateOfBirth}
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
                <span>телефон:</span>
                <input
                  required
                  onChange={this.handleTextChange}
                  name="tel"
                  type="tel"
                  value={tel || ''}
                  placeholder={prevData.tel}
                />
                <br />
                <span>email:</span>
                <input
                  required
                  onChange={this.handleTextChange}
                  name="email"
                  type="email"
                  value={email || ''}
                  placeholder={prevData.email}
                />
                <br />
                {child && userStatus !== 'admin' && userStatus !== 'esquire' && (
                  <>
                    <span>прокомментируйте причину редактирования</span>
                    <textarea
                      onChange={this.handleTextChange}
                      name="comment"
                      rows="10"
                      cols="45"
                      maxLength="500"
                      value={comment || ''}
                      placeholder="Поля *Имя, *Фамилия, *Отчество и дата рождения редактируются 
                      только с подтверждения администратора, поэтому опишите пожалуйста причину внесения изменений."
                    />
                    <br />
                    <span>вы можете прикрепит скан документа</span>
                    <DragAndDrop docType={docType} userId={userId} />
                  </>
                )}
                <p className="editing-btn" onClick={this.handleEdit}>
                  отправить
                </p>{' '}
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.userAuth.entries,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    userReAuth: data => dispatch(reAuth(data)),
  };
}

export const Editing = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditingStart);
