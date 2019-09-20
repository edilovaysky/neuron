import './UserProfileLayout.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Editing } from 'components/Editing';
import { Change } from 'components/Change';
import { UserInstruction } from '../texts/UserInstruction';

import { loadUsers } from 'actions/fetchUsers';

class UserProfileLayouts extends Component {
  state = {
    instructions: '',
    userProfile: '',
    change: '',
  };
  handleMenu = event => {
    const value = event.target.id;
    if (value == 'instructions') {
      this.setState({
        instructions: 'active',
        userProfile: '',
        change: '',
      });
    }
    if (value == 'user-profile') {
      this.setState({
        instructions: '',
        userProfile: 'active',
        change: '',
      });
    }
    if (value == 'change') {
      this.setState({
        instructions: '',
        userProfile: '',
        change: 'active',
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
    const { instructions, userProfile, change } = this.state;
    const user = this.props.user.user;
    let name;
    let status;
    if (user) {
      name = user.firstName;
      status = user.status;
    }
    return (
      <>
        <p className="user-profile-name"> Привет, {name}!</p>
        <ul className="layout-menu">
          <li
            id="instructions"
            className={`${instructions}`}
            onClick={this.handleMenu}
          >
            памятки
          </li>
          <li
            id="user-profile"
            className={`${userProfile}`}
            onClick={this.handleMenu}
          >
            мой профиль
          </li>
          <li id="change" className={`${change}`} onClick={this.handleMenu}>
            изменить пароль
          </li>
        </ul>
        <div className="layout-wraper">
          {instructions == 'active' && <UserInstruction />}
          {userProfile == 'active' && (
            <Editing userToEdit={user} userStatus={status} />
          )}
          {change == 'active' && <Change userToEdit={user} />}
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

export const UserProfileLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileLayouts);
