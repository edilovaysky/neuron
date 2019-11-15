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
    id: this.props.user.user._id,
    instructions: '',
    allusers: '',
    allchild: '',
    allteachers: '',
    reg: '',
    fetchStatus: '',
    alladmins: '',
    active: false,
    socketData: {},
    alert: false,
  };
  handleMenu = event => {
    const value = event.target.id;
    if (value == 'instructions') {
      this.setState({
        instructions: 'active',
        allusers: '',
        allchild: '',
        allteachers: '',
        reg: '',
        fetchStatus: '',
        alladmins: '',
        active: false,
      });
    }
    if (value == 'allusers') {
      this.setState({
        instructions: '',
        allusers: 'active',
        allchild: '',
        allteachers: '',
        reg: '',
        fetchStatus: 'user',
        alladmins: '',
        active: true,
      });
    }
    if (value == 'allchild') {
      this.setState({
        instructions: '',
        allusers: '',
        allchild: 'active',
        allteachers: '',
        reg: '',
        fetchStatus: 'child',
        alladmins: '',
        active: true,
      });
    }
    if (value == 'allteachers') {
      this.setState({
        instructions: '',
        allusers: '',
        allchild: '',
        allteachers: 'active',
        reg: '',
        fetchStatus: 'teacher',
        alladmins: '',
        active: true,
      });
    }
    if (value == 'reg') {
      this.setState({
        instructions: '',
        allusers: '',
        allchild: '',
        allteachers: '',
        reg: 'active',
        fetchStatus: '',
        alladmins: '',
        active: false,
      });
    }
    if (value == 'alladmins') {
      this.setState({
        instructions: '',
        allusers: '',
        allchild: '',
        allteachers: '',
        reg: '',
        fetchStatus: 'admin',
        alladmins: 'active',
        active: true,
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
      id,
      active,
      status,
      instructions,
      allusers,
      allchild,
      allteachers,
      alladmins,
      reg,
      fetchStatus,
      alert,
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
            все родители
          </li>
          <li id="allchild" className={`${allchild}`} onClick={this.handleMenu}>
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
            <Users
              users={users}
              status={fetchStatus}
              page={page}
              active={active}
              userStatus={status}
              userId={id}
            />
          )}
          {allchild == 'active' && (
            <Users
              users={users}
              status={fetchStatus}
              page={page}
              active={active}
              userStatus={status}
              userId={id}
            />
          )}
          {allteachers == 'active' && (
            <Users
              users={users}
              status={fetchStatus}
              page={page}
              active={active}
              userStatus={status}
              userId={id}
            />
          )}
          {alladmins == 'active' && (
            <Users
              users={users}
              status={fetchStatus}
              page={page}
              active={active}
              userStatus={status}
              userId={id}
            />
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
