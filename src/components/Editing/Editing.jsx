import './Editing.scss';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

export class Editing extends Component {
  constructor(props) {
    super(props);
    const { userToEdit } = this.props;
    this.state = {
      status: userToEdit.status,
      firstName: userToEdit.firstName,
      lastName: userToEdit.lastName,
      patronymic: userToEdit.patronymic,
      city: userToEdit.city,
      dateOfBirth: userToEdit.dateOfBirth,
      parentName: userToEdit.parentName,
      tel: userToEdit.tel,
      email: userToEdit.email,
      gen: userToEdit.gen,
    };
  }

  handleEdit = () => {
    const { userToEdit } = this.props;
    const id = userToEdit._id;
    let {
      status,
      firstName,
      lastName,
      patronymic,
      city,
      dateOfBirth,
      parentName,
      tel,
      email,
      gen,
    } = this.state;
    firstName = firstName.replace(/\s/g, '');
    lastName = lastName.replace(/\s/g, '');
    patronymic = patronymic.replace(/\s/g, '');
    if (city) {
      city = city.replace(/\s/g, '');
    }
    if (tel) {
      tel = tel.replace(/\s/g, '');
    }
    if (email) {
      email = email.replace(/\s/g, '');
    }

    fetch(`http://localhost:8888/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
        firstName,
        lastName,
        patronymic,
        city,
        dateOfBirth,
        parentName,
        tel,
        email,
        gen,
      }),
    }).then(response => {
      if (!response.ok) {
        throw new Error('Wrong credentials');
      }
      console.log('succesful editing');
      alert('Учетная запись успешно отредактирована.');
      return response.json();
    });
    //.then(data => {});
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    const {
      firstName,
      lastName,
      patronymic,
      city,
      dateOfBirth,
      parentName,
      tel,
      email,
      gen,
    } = this.state;
    const { userToEdit } = this.props;

    return (
      <>
        <div className="editing-wrap">
          <div className="editing">
            {userToEdit.status == 'admin' ||
              (userToEdit.status == 'esquire' && (
                <h3>редактирование пользователей</h3>
              ))}
            {userToEdit.status == 'user' && <h3>редактирование данных</h3>}
            <i>заполните подлежащие редактированию поля</i>
            <span>Имя:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="firstName"
              type="text"
              value={firstName}
              placeholder={userToEdit.firstName}
            />
            <br />
            <span>Отчество:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="patronymic"
              type="text"
              value={patronymic}
              placeholder={userToEdit.patronymic}
            />
            <br />
            <span>Фамилия:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="lastName"
              type="text"
              value={lastName}
              placeholder={userToEdit.lastName}
            />
            <br />
            <span>укажите пол</span>
            <select name="gen" onChange={this.handleTextChange}>
              <option defaultValue>пол</option>
              <option value="m">муж</option>
              <option value="f">жен</option>
            </select>
            <span>Дата рождения:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="dateOfBirth"
              type="text"
              value={dateOfBirth || ''}
              placeholder={userToEdit.dateOfBirth}
            />
            <br />
            <span>место проживания:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="city"
              type="text"
              value={city || ''}
              placeholder={userToEdit.city}
            />
            <br />
            {userToEdit.status == 'user' && (
              <span>ФИО родителя или родителей:</span>
            )}
            {userToEdit.status == 'user' && (
              <input
                required
                onChange={this.handleTextChange}
                name="parentName"
                type="text"
                value={parentName || ''}
                placeholder={userToEdit.parentName}
              />
            )}
            <br />
            <span>телефон родителя:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="tel"
              type="tel"
              value={tel || ''}
              placeholder={userToEdit.tel}
            />
            <br />
            <span>email:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="email"
              type="email"
              value={email || ''}
              placeholder={userToEdit.email}
            />
            <br />
            <p className="editing-btn" onClick={this.handleEdit}>
              отправить
            </p>
          </div>
        </div>
      </>
    );
  }
}

Editing.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  studyGroup: PropTypes.string,
  teacherName: PropTypes.string,
  teacherLastName: PropTypes.string,
  teacherPassword: PropTypes.string,
};
