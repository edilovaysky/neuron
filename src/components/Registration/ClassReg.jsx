import './Registration.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { loadUsers } from 'actions/fetchUsers';

class ClassRegistration extends Component {
  state = {
    number: '',
    name: '',
    teacher: '',
    fetchStatus: '',
  };
  handleRegIn = () => {
    let { number, name, teacher } = this.state;
    console.log(teacher);
    name = name.replace(/\s/g, '');
    if (!name == '' && !number == '' && !teacher == '') {
      fetch('http://localhost:8888/reg-class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number,
          name,
          teacher,
        }),
      }).then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        console.log('succesful class registration');
        alert('Регистрация класса прошла успешно.');
        return response.json();
      });
      //.then(data => {});
    }
  };
  handleDisplay = () => {
    this.setState({ display: !this.state.display });
  };
  handleTeacherList = () => {
    this.setState({ fetchStatus: 'teacher' });
    const { handleFetchUsers } = this.props;
    setTimeout(() => {
      handleFetchUsers(this.state.fetchStatus);
    }, 0);
  };
  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  fetchPupil = () => {
    this.setState({ pupil: [this.state.pupil] });
  };
  render() {
    const { name } = this.state;

    let teachers = [];
    if (this.props.status == 'teacher') {
      teachers = this.props.users.map(teacher => {
        return (
          <option key={teacher._id} value={teacher._id}>
            {teacher.lastName} {teacher.firstName} {teacher.patronymic}
          </option>
        );
      });
    }

    return (
      <>
        <div className="reg-wrap">
          <div className="reg">
            <h3>Регистрация классов</h3>
            <i>Все поля обязательны к заполнению.</i>
            <select name="number" onChange={this.handleTextChange}>
              <option defaultValue>
                выберите класс (например 1-й год обучения - 1-й класс)
              </option>
              <option value={1}>1-й класс</option>
              <option value={2}>2-й класс</option>
              <option value={3}>3-й класс</option>
              <option value={4}>4-й класс</option>
            </select>
            <br />
            <span>название класса:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="name"
              type="text"
              value={name}
              placeholder="название класса"
            />
            <br />
            <span
              className="reg-class-teacher-list"
              onClick={this.handleTeacherList}
            >
              список учителей:
            </span>

            <select name="teacher" onChange={this.handleTextChange}>
              <option defaultValue>выберите учителя</option>
              {teachers}
            </select>

            <br />
            <button onClick={this.handleRegIn}>отправить</button>
          </div>
        </div>
      </>
    );
  }
}

ClassRegistration.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  studyGroup: PropTypes.string,
  teacherName: PropTypes.string,
  teacherLastName: PropTypes.string,
  teacherPassword: PropTypes.string,
};
function mapStateToProps(state, props) {
  return {
    user: state.userAuth.entries,
    users: state.fetchUsers.entries.users,
    classes: state.fetchClasses.entries,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    handleFetchUsers: fetchStatus => dispatch(loadUsers(fetchStatus)),
    handleFetchClasses: () => dispatch(loadClasses()),
  };
}

export const ClassReg = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassRegistration);
