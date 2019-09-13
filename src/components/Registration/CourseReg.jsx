import './Registration.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { loadUsers } from 'actions/fetchUsers';

class CourseRegistration extends Component {
  state = {
    studyYear: '',
    course_id: '',
    subject: '',
    subjects: [],
    courses: [],
    displayReg: false,
    displayEdit: false,
  };
  handleRegIn = () => {
    let { studyYear } = this.state;

    if (!studyYear == '') {
      fetch('http://localhost:8888/reg-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studyYear,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          return response.json();
        })
        .then(data => {
          if (data) {
            console.log('succesful course registration');
            alert('Регистрация курса прошла успешно.');
          }
        });
    }
  };
  handleRegOut = () => {
    const id = this.state.course_id;
    if (!id == '') {
      fetch(`http://localhost:8888/courses/delete/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          return response.json();
        })
        .then(data => {
          if (data) {
            console.log('course was deleted');
            alert('Курс удален.');
          }
        });
    }
  };
  handleAdd = () => {
    const { course_id, subject } = this.state;
    let id = course_id;
    fetch(`http://localhost:8888/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }

        return response.json();
      })
      .then(data => {
        console.log(data);

        console.log('succesful editing');
        alert('предмет добавлен в курс');
      });
  };

  handleDel = () => {
    const { course_id, subject } = this.state;
    let id = course_id;
    fetch(`http://localhost:8888/courses/delete/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json();
      })
      .then(data => {
        console.log('succesful delete');
        alert('предмет удален курса');

        console.log(data);
      });
  };

  handleDisplayReg = () => {
    this.setState({ displayReg: !this.state.displayReg });
  };
  handleDisplayEdit = () => {
    this.setState({ displayEdit: !this.state.displayEdit });
  };
  fetchSubject = () => {
    fetch(`http://localhost:8888/subject`, {
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ subjects: data });
      });
  };

  fetchCourse = () => {
    fetch(`http://localhost:8888/courses`, {
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ courses: data });
      });
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { subjects, courses, displayReg, displayEdit } = this.state;
    let courseToEdit;
    let subjectToChoiсe;
    if (subjects.subject) {
      subjectToChoiсe = subjects.subject.map((i, index) => {
        return (
          <option key={index} value={i._id}>
            {i.subject}
          </option>
        );
      });
    }
    if (courses.course) {
      courseToEdit = courses.course.map((i, index) => {
        return (
          <option key={index} value={i._id}>
            {i.studyYear}-й класс.
          </option>
        );
      });
    }

    return (
      <>
        <div className="reg-wrap">
          <div className="reg">
            <h3 onClick={this.handleDisplayReg}>
              Регистрация и удаление курсов
            </h3>
            {displayReg && (
              <>
                <i>Все поля обязательны к заполнению.</i>
                <select name="studyYear" onChange={this.handleTextChange}>
                  <option defaultValue>
                    выберите год обучения (например 1-й год обучения - 1-й
                    класс)
                  </option>
                  <option value={1}>1-й класс</option>
                  <option value={2}>2-й класс</option>
                  <option value={3}>3-й класс</option>
                  <option value={4}>4-й класс</option>
                </select>
                <br />
                <button onClick={this.handleRegIn}>добавить курс</button>
                <br />
                <span className="click-span" onClick={this.fetchCourse}>
                  выберите курс для редактирования
                </span>
                <select name="course_id" onChange={this.handleTextChange}>
                  <option defaultValue>выберите курс для удаления</option>
                  {courseToEdit}
                </select>
                <br />
                <button onClick={this.handleRegOut}>удалить курс</button>
              </>
            )}
          </div>
        </div>
        <div className="reg-wrap">
          <div className="reg">
            <h3 onClick={this.handleDisplayEdit}>Редактирование курсов</h3>
            {displayEdit && (
              <>
                <i>Все поля обязательны к заполнению.</i>
                <span className="click-span" onClick={this.fetchCourse}>
                  выберите курс для редактирования
                </span>
                <select name="course_id" onChange={this.handleTextChange}>
                  <option defaultValue>выберите курс для редактирования</option>
                  {courseToEdit}
                </select>
                <br />
                <span className="click-span" onClick={this.fetchSubject}>
                  выберите предмет:
                </span>
                <select name="subject" onChange={this.handleTextChange}>
                  <option defaultValue>предмет обучения</option>
                  {subjectToChoiсe}
                </select>
                <br />
                <div className="button-block">
                  <button onClick={this.handleAdd}>добавить предмет</button>
                  <button onClick={this.handleDel}>удалить предмет</button>
                </div>
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
    users: state.fetchUsers.entries.users,
    classes: state.fetchClasses.entries,
    courses: state.fetchCourses.entries.course,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    handleFetchUsers: fetchStatus => dispatch(loadUsers(fetchStatus)),
    handleFetchClasses: () => dispatch(loadClasses()),
  };
}

export const CourseReg = connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseRegistration);
