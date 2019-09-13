import './UserClass.scss';
import React, { Component } from 'react';

export class UserClass extends Component {
  render() {
    const teacher = this.props;
    console.log(teacher);
    return (
      <>
        <span className="user-class-span">Мой учитель:</span>
        <p className="user-class-p">
          {teacher.teacher.firstName} {teacher.teacher.patronymic}{' '}
          {teacher.teacher.lastName}
        </p>
      </>
    );
  }
}
