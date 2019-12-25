import './OfficeSideBar.scss';

import React, { Component } from 'react';

import { UserSideBar } from './UserSideBar';
import { ChildSideBar } from './ChildSideBar';
import { TeacherSideBar } from './TeacherSideBar';
import { AdminSideBar } from './AdminSideBar';
import { SuperSideBar } from './SuperSideBar';

import { OfficeBody } from 'components/OfficeBody';

export class OfficeSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props,
      layout: '',
    };
  }
  handleEnter = value => {
    this.setState({ layout: value });
  };
  defineSideBar = () => {
    const { status } = this.state.status;
    const { dispOrderToPay } = this.state;
    if (status == 'user') {
      return <UserSideBar onEnter={this.handleEnter} status={status} />;
    }
    if (status == 'child') {
      return <ChildSideBar onEnter={this.handleEnter} status={status} />;
    }
    if (status == 'teacher') {
      return <TeacherSideBar onEnter={this.handleEnter} status={status} />;
    }
    if (status == 'admin') {
      return <AdminSideBar onEnter={this.handleEnter} status={status} />;
    }
    if (status == 'esquire') {
      return <SuperSideBar onEnter={this.handleEnter} status={status} />;
    } else {
      return null;
    }
  };

  render() {
    const { layout, status } = this.state;
    const { onSuccess } = this.props;
    return (
      <>
        {this.defineSideBar()}
        <OfficeBody layout={layout} onSuccess={onSuccess} status={status} />
      </>
    );
  }
}
