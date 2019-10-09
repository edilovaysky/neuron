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
      active: userToEdit.active,
      child: false,
      displayEdit: false,
    };
  }
  componentWillMount() {
    const { userToEdit } = this.props;
    if (userToEdit.status == 'child') {
      this.setState({ child: true });
    }
  }

  handleEdit = () => {
    const { userToEdit, reAuth } = this.props;
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
      active,
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
        active,
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
    reAuth();
    //.then(data => {});
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
            <p>* активен</p>
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
      status,
      firstName,
      lastName,
      patronymic,
      city,
      dateOfBirth,
      parentName,
      tel,
      email,
      child,
      displayEdit,
    } = this.state;
    const { userStatus } = this.props;

    const isActive = this.isUserActive();
    return (
      <>
        <div className="editing-wrap">
          <div className="editing">
            {userStatus == 'admin' && (
              <h3 onClick={this.handelDisplayEdit}>
                редактирование пользователей
              </h3>
            )}
            {userStatus == 'esquire' && (
              <h3 onClick={this.handelDisplayEdit}>
                редактирование пользователей
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
                <span>Имя:</span>
                <input
                  required
                  onChange={this.handleTextChange}
                  name="firstName"
                  type="text"
                  value={firstName}
                  placeholder={firstName}
                />
                <br />
                <span>Отчество:</span>
                <input
                  required
                  onChange={this.handleTextChange}
                  name="patronymic"
                  type="text"
                  value={patronymic}
                  placeholder={patronymic}
                />
                <br />
                <span>Фамилия:</span>
                <input
                  required
                  onChange={this.handleTextChange}
                  name="lastName"
                  type="text"
                  value={lastName}
                  placeholder={lastName}
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
                  placeholder={dateOfBirth}
                />
                <br />
                <span>место проживания:</span>
                <input
                  required
                  onChange={this.handleTextChange}
                  name="city"
                  type="text"
                  value={city || ''}
                  placeholder={city}
                />
                <br />
                {status == 'user' && <span>ФИО родителя или родителей:</span>}
                {status == 'user' && (
                  <input
                    required
                    onChange={this.handleTextChange}
                    name="parentName"
                    type="text"
                    value={parentName || ''}
                    placeholder={parentName}
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
                  placeholder={tel}
                />
                <br />
                <span>email:</span>
                <input
                  required
                  onChange={this.handleTextChange}
                  name="email"
                  type="email"
                  value={email || ''}
                  placeholder={email}
                />
                <br />
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
