import './Registration.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadUsers } from 'actions/fetchUsers';

class AddCoursesToClass extends Component {
  state = {
    id: {},
    courseId: '',
    isCourseInClass: false,
  };

  handleAddCourse = () => {
    let { id, courseId } = this.state;
    this.props.classes.studyClasses.map(i => {
      if (i._id == id) {
        i.courses.map(i => {
          if (i == courseId) {
            this.setState({ isCourseInClass: true });
            alert(
              'Выбраный курс есть в этом классе и он не может быть добавлен.'
            );
          } else {
            alert('Выбранного курса нет в этом классе и он будет добавлен.');
          }
        });
      }
    });
    setTimeout(() => {
      this.fetchAdd();
    }, 0);
  };

  fetchAdd = () => {
    const { isCourseInClass, id, courseId } = this.state;
    console.log(isCourseInClass);
    if (!isCourseInClass) {
      fetch(`http://localhost:8888/classes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          return response.json();
        })
        .then(data => {
          const message = 'Вы не выбрали класс или курс';
          if (JSON.stringify(data) == '{}' || data.updateClass == message) {
            alert(message);
          } else {
            console.log('course was added to class');
            alert('Выбраный курс добавлен в выбраный класс');
          }
        });
    }
  };

  handleDelCourse = () => {
    let { id, courseId, isCourseInClass } = this.state;
    this.props.classes.studyClasses.map(i => {
      if (i._id == id) {
        i.courses.map(i => {
          if (i == courseId) {
            this.setState({ isCourseInClass: true });
            alert('Выбраный курс есть в этом классе и он будет удален');
          } else {
            alert(
              'Выбранного курса нет в этом классе и он не может быть удален'
            );
          }
        });
      }
    });
    setTimeout(() => {
      this.fetchDel();
    }, 0);
  };

  fetchDel = () => {
    const { isCourseInClass, id, courseId } = this.state;
    if (isCourseInClass) {
      fetch(`http://localhost:8888/classes/delete/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          return response.json();
        })
        .then(data => {
          const message = 'Вы не выбрали класс или курс';
          if (data.updateClass == message || JSON.stringify(data) == '{}') {
            alert(message);
          } else {
            console.log('course was deleted from class');
            alert('Выбраный курс удален из выбранного класса');
          }
        });
    }
  };
  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  fetchPupil = v => {
    this.setState({ pupil: v.pupil });
  };
  render() {
    const { courses, classes } = this.props;

    const course = courses.course.map((i, index) => {
      return (
        <option key={index} value={i._id}>
          Курс за {i.studyYear}-й класс
        </option>
      );
    });
    const classToUpdate = classes.studyClasses.map(item => {
      return (
        <option key={item._id} value={item._id}>
          {item.number}
          {item.name}{' '}
        </option>
      );
    });

    return (
      <>
        <div className="reg-wrap">
          <div className="reg">
            <h3>Добавление курсов к классам</h3>

            <span>выберите класс:</span>
            <select name="id" onChange={this.handleTextChange}>
              <option defaultValue>выберите класс</option>
              {classToUpdate}
            </select>
            <br />
            <span className="reg-class-user" onClick={this.handleDisplay}>
              Выберите курс:
            </span>
            <select name="courseId" onChange={this.handleTextChange}>
              <option defaultValue>выберите курс</option>
              {course}
            </select>
            <br />
            <button onClick={this.handleAddCourse}>добавить курс</button>
            <br />
            <button onClick={this.handleDelCourse}>удалить курс</button>
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
    courses: state.fetchCourses.entries,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    handleFetchUsers: fetchStatus => dispatch(loadUsers(fetchStatus)),
    handleFetchClasses: () => dispatch(loadClasses()),
  };
}

export const AddCourseToClass = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCoursesToClass);
