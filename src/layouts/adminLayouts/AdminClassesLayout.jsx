import './AdminUsersLayout.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ClassReg } from 'components/Registration/ClassReg';
import { AddUsersToClass } from 'components/Registration/AddUsersToClass';
import { AddCourseToClass } from 'components/Registration/AddCourseToClass';
import { Classes } from 'components/Classes';
import { AdminInstruction } from '../texts/AdminInstruction';

import { loadUsers } from 'actions/fetchUsers';
import { loadClasses } from 'actions/fetchClasses';

class AdminClassesLayouts extends Component {
  state = {
    status: this.props.user.user.status,
    instructions: '',
    allClasses: '',
    fetchStatus: '',
    reg: '',
    addusertoclass: '',
    addcoursetoclass: '',
  };

  handleMenu = event => {
    const value = event.target.id;
    if (value == 'instructions') {
      this.setState({
        instructions: 'active',
        allClasses: '',
        fetchStatus: '',
        reg: '',
        addusertoclass: '',
        addcoursetoclass: '',
      });
    }
    if (value == 'allclasses') {
      this.setState({
        instructions: '',
        allClasses: 'active',
        fetchStatus: 'user',
        reg: '',
        addusertoclass: '',
        addcoursetoclass: '',
      });
    }
    if (value == 'reg') {
      this.setState({
        instructions: '',
        allClasses: '',
        fetchStatus: 'teacher',
        reg: 'active',
        addusertoclass: '',
        addcoursetoclass: '',
      });
    }
    if (value == 'addusertoclass') {
      this.setState({
        instructions: '',
        allClasses: '',
        fetchStatus: 'user',
        reg: '',
        addusertoclass: 'active',
        addcoursetoclass: '',
      });
    }
    if (value == 'addcoursetoclass') {
      this.setState({
        instructions: '',
        allClasses: '',
        fetchStatus: '',
        reg: '',
        addusertoclass: '',
        addcoursetoclass: 'active',
      });
    }

    setTimeout(() => {
      this.handleFetchStatus();
      if (
        this.state.allClasses == 'active' ||
        this.state.addusertoclass == 'active'
      ) {
        const { handleFetchClasses } = this.props;
        handleFetchClasses();
      }
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
      fetchStatus,
      instructions,
      allClasses,
      reg,
      addusertoclass,
      addcoursetoclass,
    } = this.state;
    const users = this.props.users;

    const classes = this.props.classes;
    return (
      <>
        <p>Страница управления классами</p>
        <ul className="layout-menu">
          <li
            id="instructions"
            className={`${instructions}`}
            onClick={this.handleMenu}
          >
            инструкции
          </li>
          <li
            id="allclasses"
            className={`${allClasses}`}
            onClick={this.handleMenu}
          >
            все классы
          </li>
          <li id="reg" className={`${reg}`} onClick={this.handleMenu}>
            регистрация классов
          </li>
          <li
            id="addusertoclass"
            className={`${addusertoclass}`}
            onClick={this.handleMenu}
          >
            добавление учеников в классы
          </li>
          <li
            id="addcoursetoclass"
            className={`${addcoursetoclass}`}
            onClick={this.handleMenu}
          >
            добавление курсов в класс
          </li>
        </ul>
        <div className="layout-wraper">
          {instructions == 'active' && <AdminInstruction />}
          {allClasses == 'active' && <Classes classes={classes} />}
          {reg == 'active' && <ClassReg users={users} status={fetchStatus} />}
          {addusertoclass == 'active' && (
            <AddUsersToClass users={users} status={fetchStatus} />
          )}
          {addcoursetoclass == 'active' && <AddCourseToClass />}
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
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    handleFetchUsers: fetchStatus => dispatch(loadUsers(fetchStatus)),
    handleFetchClasses: () => dispatch(loadClasses()),
  };
}

export const AdminClassesLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminClassesLayouts);
