import './Registration.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { loadUsers } from 'actions/fetchUsers';
import { FindUser } from 'components/FindUser';

class AddUserToClass extends Component {
  state = {
    number: '',
    name: '',
    teacher: '',
    pupil: '',
    id: {},
    fetchStatus: '',
    display: false,
  };

  handleEdit = () => {
    let { id, pupil } = this.state;

    this.props.classes.studyClasses[0].pupil.map(item => {
      console.log(item._id);
      if (pupil == item.user) {
        alert('Выбраный ученик уже добавлен в этот класс');
        return (pupil = '');
      }
    });

    fetch(`http://localhost:8888/classes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pupil,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json();
      })
      .then(data => {
        let x = data.updateClass;
        if (x == 'Вы не выбрали класс или ученика') {
          alert(x);
        } else {
          console.log('user was added to class');
          alert('Выбраный ученик добавлен в выбраный класс');
        }
      });
  };
  handleDisplay = () => {
    this.setState({ display: !this.state.display });
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
    const { number, name, pupil, display } = this.state;

    const page = 'classReg';
    const classToUpdate = this.props.classes.studyClasses.map(item => {
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
            <h3>Добавление учеников в классы</h3>
            <i>Все поля обязательны к заполнению.</i>
            <span>выберите класс:</span>
            <select name="id" onChange={this.handleTextChange}>
              <option defaultValue>выберите класс</option>
              {classToUpdate}
            </select>
            <br />
            <span className="reg-class-user" onClick={this.handleDisplay}>
              Добавьте ученика:
            </span>
            {display && (
              <FindUser
                status={'user'}
                page={page}
                fetchPupil={this.fetchPupil}
                pupil={pupil}
              />
            )}

            <button onClick={this.handleEdit}>добавить ученика</button>
          </div>
        </div>
      </>
    );
  }
}

AddUserToClass.propTypes = {
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

export const AddUsersToClass = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserToClass);
