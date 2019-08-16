import './AdminUsersLayout.scss';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Registration } from 'components/Registration';

class AdminUsersLayouts extends Component {
  state = {
    status: this.props.user.user.status,
    instructions: '',
    allusers: '',
    allteachers: '',
    reg: '',
    deletes: '',
  };
  handleMenu = event => {
    const value = event.target.id;
    if (value == 'instructions') {
      this.setState({
        instructions: 'active',
        allusers: '',
        allteachers: '',
        reg: '',
        deletes: '',
      });
    }
    if (value == 'allusers') {
      this.setState({
        instructions: '',
        allusers: 'active',
        allteachers: '',
        reg: '',
        deletes: '',
      });
    }
    if (value == 'allteachers') {
      this.setState({
        instructions: '',
        allusers: '',
        allteachers: 'active',
        reg: '',
        deletes: '',
      });
    }
    if (value == 'reg') {
      this.setState({
        instructions: '',
        allusers: '',
        allteachers: '',
        reg: 'active',
        deletes: '',
      });
    }
    if (value == 'deletes') {
      this.setState({
        instructions: '',
        allusers: '',
        allteachers: '',
        reg: '',
        deletes: 'active',
      });
    }

    event.preventDefault();
    console.log();
  };
  render() {
    const {
      status,
      instructions,
      allusers,
      allteachers,
      reg,
      deletes,
    } = this.state;
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
          <li id="deletes" className={`${deletes}`} onClick={this.handleMenu}>
            удаление
          </li>
        </ul>
        <div className="layout-wraper">
          {reg == 'active' && <Registration adminStatus={status} />}
        </div>
      </>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.userAuth.entries,
  };
}
export const AdminUsersLayout = connect(mapStateToProps)(AdminUsersLayouts);
