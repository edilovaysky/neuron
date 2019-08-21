import './AdminUsersLayout.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Registration } from 'components/Registration';
import { Users } from 'components/Users';
import { Teachers } from 'components/Teachers';
import { AdminInstruction } from '../texts/AdminInstruction';

import { loadUsers } from 'actions/fetchUsers';

class AdminUsersLayouts extends Component {
  state = {
    status: this.props.user.user.status,
    instructions: '',
    allusers: '',
    allteachers: '',
    reg: '',
    fetchStatus: '',
  };
  handleMenu = event => {
    const value = event.target.id;
    if (value == 'instructions') {
      this.setState({
        instructions: 'active',
        allusers: '',
        allteachers: '',
        reg: '',
        fetchStatus: '',
      });
    }
    if (value == 'allusers') {
      this.setState({
        instructions: '',
        allusers: 'active',
        allteachers: '',
        reg: '',
        fetchStatus: 'user',
      });
    }
    if (value == 'allteachers') {
      this.setState({
        instructions: '',
        allusers: '',
        allteachers: 'active',
        reg: '',
        fetchStatus: 'teacher',
      });
    }
    if (value == 'reg') {
      this.setState({
        instructions: '',
        allusers: '',
        allteachers: '',
        reg: 'active',
        fetchStatus: '',
      });
    }
    setTimeout(() => {
      //const { fetchStatus } = this.state;
      this.handleFetchStatus();
    }, 0);

    event.preventDefault();
  };
  handleFetchStatus = () => {
    const { fetchStatus } = this.state;
    const { handleFetchUsers } = this.props;
    handleFetchUsers(fetchStatus);
  };
  render() {
    const { status, instructions, allusers, allteachers, reg } = this.state;
    const users = this.props.users;
    console.log(users);
    return (
      <>
        <p>Страница управления пользователями</p>
        <ul className="layout-menu">
          <li
            id="instructions"
            className={`${instructions}`}
            onClick={this.handleMenu}
          >
            инструкции
          </li>
          <li id="allusers" className={`${allusers}`} onClick={this.handleMenu}>
            все ученики
          </li>
          <li
            id="allteachers"
            className={`${allteachers}`}
            onClick={this.handleMenu}
          >
            все учителя
          </li>
          <li id="reg" className={`${reg}`} onClick={this.handleMenu}>
            регистрация
          </li>
        </ul>
        <div className="layout-wraper">
          {reg == 'active' && <Registration adminStatus={status} />}
          {instructions == 'active' && <AdminInstruction />}
          {allusers == 'active' && <Users users={users} />}
          {allteachers == 'active' && <Users users={users} />}
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

export const AdminUsersLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUsersLayouts);
