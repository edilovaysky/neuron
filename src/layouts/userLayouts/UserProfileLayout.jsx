import './UserProfileLayout.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Editing } from 'components/Editing';
import { Registration } from 'components/Registration';
import { Change } from 'components/Change';
import { load } from 'actions/auth';
import { UserInstruction } from 'layouts/texts/UserInstruction';
import { Hint } from 'components/Hint';

import { loadUsers } from 'actions/fetchUsers';

class UserProfileLayouts extends Component {
  state = {
    instructions: '',
    userProfile: '',
    childProfile: '',
    change: '',
    foundChild: [],
    password: '',
    displayHint: false,
    displayChildOffice: false,
  };

  componentWillMount() {
    const user = this.props.user.user;

    user.child.map(i => {
      const id = i;
      this.handleFetchChild(id);
    });
  }
  handleReAuth = () => {
    const { authUser } = this.props;
    const reAuthUser = this.props.user.user;
    const firstName = reAuthUser.firstName;
    const lastName = reAuthUser.lastName;
    const id = reAuthUser._id;
    fetch(`http://localhost:8888/userpass/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ password: data });
      });
    setTimeout(() => {
      let password = this.state.password.password;
      authUser(firstName, lastName, password);
    }, 1000);
  };

  handleMenu = event => {
    const value = event.target.id;
    if (value == 'instructions') {
      this.setState({
        instructions: 'active',
        userProfile: '',
        change: '',
        childProfile: '',
      });
    }
    if (value == 'user-profile') {
      this.setState({
        instructions: '',
        userProfile: 'active',
        change: '',
        childProfile: '',
      });
    }
    if (value == 'change') {
      this.setState({
        instructions: '',
        userProfile: '',
        change: 'active',
        childProfile: '',
      });
    }
    if (value == 'child-profile') {
      this.setState({
        instructions: '',
        userProfile: '',
        change: '',
        childProfile: 'active',
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
  handleFetchChild = id => {
    fetch(`http://localhost:8888/child/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ foundChild: [...this.state.foundChild, data] });
        console.log('the child was found');
      });
  };
  handleShowHint = () => {
    this.setState({ displayHint: true });
  };
  handleHideHint = () => {
    this.setState({ displayHint: false });
  };
  handleEnter = () => {
    this.setState({ displayChildOffice: !this.displayChildOffice });
    console.log('child office');
  };

  render() {
    const {
      instructions,
      userProfile,
      change,
      childProfile,
      foundChild,
      displayHint,
      displayChildOffice,
    } = this.state;
    let childName;
    if (foundChild.length) {
      childName = foundChild.map(i => {
        return (
          <li
            className="user-enter-to-child"
            key={i.user._id}
            onClick={this.handleEnter}
            onMouseOver={this.handleShowHint}
            onMouseOut={this.handleHideHint}
          >
            {i.user.firstName} {i.user.lastName}
          </li>
        );
      });
    }
    const user = this.props.user.user;
    const child = true;
    let name;
    let status;
    if (user && user.status == 'user') {
      name = `${user.firstName} ${user.patronymic}`;
      status = user.status;
    }
    if (user && user.status == 'child') {
      name = `${user.firstName}`;
      status = user.status;
    }
    return (
      <>
        {status == 'user' && (
          <>
            <p className="user-profile-name"> Здравствуйте, {name}.</p>
            {childName && <ul>зарегистрированые ученики: {childName}</ul>}
            {displayHint && <Hint />}
          </>
        )}
        {status == 'child' && (
          <p className="user-profile-name"> Привет, {name}!</p>
        )}
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
          <li
            id="child-profile"
            className={`${childProfile}`}
            onClick={this.handleMenu}
          >
            зарегистрировать ребенка
          </li>
        </ul>
        <div className="layout-wraper">
          {instructions == 'active' && <UserInstruction />}
          {userProfile == 'active' && (
            <Editing
              userToEdit={user}
              userStatus={status}
              reAuth={this.handleReAuth}
            />
          )}
          {change == 'active' && <Change userToEdit={user} />}
          {childProfile == 'active' && (
            <Registration
              userToEdit={user}
              child={child}
              reAuth={this.handleReAuth}
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
    authUser: (firstName, lastName, password) =>
      dispatch(load(firstName, lastName, password)),
  };
}

export const UserProfileLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileLayouts);
