import './AdminUsersLayout.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Registration } from 'components/Registration';
import { Users } from 'components/Users';
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
    alladmins: '',
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
        alladmins: '',
      });
    }
    if (value == 'allusers') {
      this.setState({
        instructions: '',
        allusers: 'active',
        allteachers: '',
        reg: '',
        fetchStatus: 'user',
        alladmins: '',
      });
    }
    if (value == 'allteachers') {
      this.setState({
        instructions: '',
        allusers: '',
        allteachers: 'active',
        reg: '',
        fetchStatus: 'teacher',
        alladmins: '',
      });
    }
    if (value == 'reg') {
      this.setState({
        instructions: '',
        allusers: '',
        allteachers: '',
        reg: 'active',
        fetchStatus: '',
        alladmins: '',
      });
    }
    if (value == 'alladmins') {
      this.setState({
        instructions: '',
        allusers: '',
        allteachers: '',
        reg: '',
        fetchStatus: 'admin',
        alladmins: 'active',
      });
    }
    setTimeout(() => {
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
    const {
      status,
      instructions,
      allusers,
      allteachers,
      alladmins,
      reg,
      fetchStatus,
    } = this.state;
    const users = this.props.users;
    const page = 'otherPages';
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
          {status == 'esquire' && (
            <li
              id="alladmins"
              className={`${alladmins}`}
              onClick={this.handleMenu}
            >
              все администраторы
            </li>
          )}
          <li id="reg" className={`${reg}`} onClick={this.handleMenu}>
            регистрация
          </li>
        </ul>
        <div className="layout-wraper">
          {reg == 'active' && <Registration adminStatus={status} />}
          {instructions == 'active' && <AdminInstruction />}
          {allusers == 'active' && (
            <Users users={users} status={fetchStatus} page={page} />
          )}
          {allteachers == 'active' && (
            <Users users={users} status={fetchStatus} page={page} />
          )}
          {alladmins == 'active' && (
            <Users users={users} status={fetchStatus} page={page} />
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

export const AdminUsersLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUsersLayouts);
