import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OfficeSideBar } from 'components/OfficeSideBar';

class SideBarContainer extends Component {
  render() {
    const { onSuccess, user } = this.props;
    let status;
    if (user.user) {
      status = user.user.status;
    }

    return (
      <>
        <OfficeSideBar status={status} onSuccess={onSuccess} />
      </>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    user: state.userAuth.entries,
  };
}

export const OfficeSideBarContainer = connect(mapStateToProps)(
  SideBarContainer
);
