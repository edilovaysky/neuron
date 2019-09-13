import './EditingClass.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { loadUsers } from 'actions/fetchUsers';
import { loadClasses } from 'actions/fetchClasses';

export class EditingClasses extends Component {
  constructor(props) {
    super(props);
    const { classToEdit } = this.props;
    this.state = {
      number: classToEdit.number,
      name: classToEdit.name,
      teacher: classToEdit.teacher,
      user: '',
    };
  }
  componentWillMount() {
    let fetchStatus = 'teacher';
    const { handleFetchUsers } = this.props;
    handleFetchUsers(fetchStatus);
  }

  handleEdit = () => {
    const { classToEdit } = this.props;
    const id = classToEdit._id;
    let { number, name, teacher, user } = this.state;
    fetch(`http://localhost:8888/classes/delete/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number,
        name,
        teacher,
        user,
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
    const { number, name } = this.state;
    const { classToEdit, usersToEdit, users } = this.props;
    const teachersToEdit = users;
    const teachers = teachersToEdit.map(teacher => {
      return (
        <option key={teacher._id} value={teacher._id}>
          {teacher.lastName} {teacher.firstName} {teacher.patronymic}
        </option>
      );
    });
    const pupil = usersToEdit.map((user, index) => {
      return (
        <option key={index} value={user._id}>
          {user.lastName} {user.firstName} {user.patronymic}
        </option>
      );
    });

    return (
      <>
        <div className="editing-wrap">
          <div className="editing">
            <h3>редактирование данных</h3>
            <i>заполните подлежащие редактированию поля</i>
            <span>год обучения:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="number"
              type="text"
              value={number}
              placeholder={classToEdit.number}
            />
            <br />
            <span>название класса:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="name"
              type="text"
              value={name}
              placeholder={classToEdit.name}
            />
            <br />
            <span>заменить учителя: </span>

            <select name="teacher" onChange={this.handleTextChange}>
              <option defaultValue>выберите учителя</option>
              {teachers}
            </select>
            <br />
            <span>удалить ученика : </span>

            <select name="user" onChange={this.handleTextChange}>
              <option defaultValue>
                выберите ученика для удаления из класса
              </option>
              {pupil}
            </select>
            <br />
            <p className="editing-btn" onClick={this.handleEdit}>
              отредактировать
            </p>
          </div>
        </div>
      </>
    );
  }
}

EditingClasses.propTypes = {
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

export const EditingClass = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditingClasses);
