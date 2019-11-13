import './ChildOffice.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadUsers } from 'actions/fetchUsers';
import { Editing } from '../../components/Editing/Editing';

export class ChildOffice extends Component {
  render() {
    const { officeOfChild, parent } = this.props;
    const name = `${officeOfChild.user.firstName} ${officeOfChild.user.lastName}`;
    const userToEdit = officeOfChild.user;
    if (parent) {
      userToEdit.email = parent.email;
    }

    return (
      <div className="child-office-wraper">
        <span className="child-office-span">кабинет ученика</span>
        <p>{name}</p>
        <Editing userToEdit={userToEdit} />
      </div>
    );
  }
}

/* function mapStateToProps(state, props) {
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
)(UserProfileLayouts); */
