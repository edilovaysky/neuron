import './UserClass.scss';
import React, { Component } from 'react';

export class UserClass extends Component {
  render() {
    const { teacher, studyClass } = this.props;

    return (
      <>
        <span className="user-class-span">Мой класс:</span>
        <p className="user-class-p">
          {studyClass.number}-й {studyClass.name}{' '}
        </p>
        <span className="user-class-span">Мой учитель:</span>
        <p className="user-class-p">
          {teacher.firstName} {teacher.patronymic} {teacher.lastName}
        </p>
      </>
    );
  }
}
