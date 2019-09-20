import './UserClass.scss';
import React, { Component } from 'react';

export class UserClass extends Component {
  myTeacher = teacher => {
    if (teacher) {
      return (
        <p className="user-class-p">
          {teacher.firstName} {teacher.patronymic} {teacher.lastName}
        </p>
      );
    }
  };
  render() {
    const { teacher, studyClass } = this.props;
    const myTeacher = this.myTeacher(teacher);
    return (
      <>
        <span className="user-class-span">Мой класс:</span>
        <p className="user-class-p">
          {studyClass.number}-й {studyClass.name}{' '}
        </p>
        <span className="user-class-span">Мой учитель:</span>
        {myTeacher}
      </>
    );
  }
}
