import './StudyClass.scss';
import React, { Component } from 'react';

import { EditingClass } from '../EditingClass/EditingClass';

export class StudyClass extends Component {
  state = {
    display: false,
    edit: false,
    pupil_id: [],
    teacher_id: '',
    fetchTeacher: {},
    fetchUser: [],
  };
  componentDidMount() {
    this.setState(() => {
      this.state.pupil_id = this.props.pupil.map(user => {
        return user;
      });
    });
    this.setState({ teacher_id: this.props.teacher });
  }
  handleDisplay = () => {
    this.setState({ display: !this.state.display });
    let { pupil_id, teacher_id } = this.state;
    let id = teacher_id;
    if (!this.state.display) {
      this.setState({ fetchUser: [] });
    }
    fetch(`http://localhost:8888/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ fetchTeacher: data });
      });

    pupil_id.forEach(id => {
      fetch(`http://localhost:8888/user/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          return response.json();
        })
        .then(data => {
          this.setState({ fetchUser: [...this.state.fetchUser, data] });
        });
    });
  };

  handleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };
  render() {
    const { number, name } = this.props;

    const { display, edit, fetchTeacher, fetchUser } = this.state;
    console.log(fetchUser);
    const users = fetchUser.map((user, index) => {
      console.log(user);
      return (
        <li key={index}>
          <p>
            ученик: {user.lastName} {user.firstName} {user.patronymic}
          </p>
        </li>
      );
    });
    return (
      <>
        <div className="card-wraper">
          <div className="card-header">
            <p onClick={this.handleDisplay}>
              {number}-й класс. Название: {name}
            </p>
          </div>
          {display && (
            <div className="card-body">
              <p>
                учитель: {fetchTeacher.lastName} {fetchTeacher.firstName}{' '}
                {fetchTeacher.patronymic}
              </p>
              <ol>{users}</ol>

              <button onClick={this.handleEdit}>редактировать</button>

              {edit && (
                <EditingClass
                  classToEdit={this.props}
                  usersToEdit={fetchUser}
                />
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}
