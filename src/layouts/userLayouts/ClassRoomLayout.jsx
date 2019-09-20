import './UserProfileLayout.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserClass } from 'components/UserClass';
import { UserInstruction } from '../texts/UserInstruction';

import { loadUsers } from 'actions/fetchUsers';

class ClassRoomLayouts extends Component {
  state = {
    status: this.props.user.user.status,
    instructions: '',
    myclass: '',
    studyClass: {},
    displayClass: false,
    fetchStatus: '',
  };
  handleMenu = event => {
    const id = this.props.user.user.class;
    const value = event.target.id;
    if (value == 'instructions') {
      this.setState({
        instructions: 'active',
        myclass: '',
        fetchStatus: '',
      });
    }
    if (value == 'myclass') {
      this.setState({
        instructions: '',
        myclass: 'active',
        fetchStatus: 'teacher',
      });
      fetch(`http://localhost:8888/class/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          return response.json(response);
        })
        .then(data => {
          this.handleFetchStatus();
          this.setState({ studyClass: data.studyClass });
          if (JSON.stringify(data) == '{}') {
            alert('Вы не являетесь учеником какого-либо класса');
            this.setState({ displayClass: false });
          } else {
            this.setState({ displayClass: true });
          }
        });
    }
    event.preventDefault();
  };

  handleFetchStatus = () => {
    const { fetchStatus } = this.state;
    const { handleFetchUsers } = this.props;
    handleFetchUsers(fetchStatus);
  };

  render() {
    const { instructions, myclass, studyClass, displayClass } = this.state;

    const teachers = this.props.users.map((i, index) => {
      if (studyClass) {
        if (studyClass.teacher == i._id) {
          return i;
        }
      }
    });

    let teacher;
    if (teachers[0]) {
      teacher = teachers[0];
    }
    return (
      <>
        <ul className="layout-menu">
          <li
            id="instructions"
            className={`${instructions}`}
            onClick={this.handleMenu}
          >
            инструкции
          </li>
          <li id="myclass" className={`${myclass}`} onClick={this.handleMenu}>
            класс
          </li>
        </ul>
        <div className="layout-wraper">
          {instructions == 'active' && <UserInstruction />}
          {myclass == 'active' && displayClass && (
            <UserClass teacher={teacher} studyClass={studyClass} />
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.userAuth.entries,
    users: state.fetchUsers.entries.users,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    handleFetchUsers: fetchStatus => dispatch(loadUsers(fetchStatus)),
  };
}

export const ClassRoomLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassRoomLayouts);
