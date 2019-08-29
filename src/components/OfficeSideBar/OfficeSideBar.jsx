import './OfficeSideBar.scss';

import React, { Component } from 'react';

import { UserSideBar } from './UserSideBar';
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
    if (status == 'user') {
      return <UserSideBar onEnter={this.handleEnter} />;
    }
    if (status == 'teacher') {
      return <TeacherSideBar onEnter={this.handleEnter} />;
    }
    if (status == 'admin') {
      return <AdminSideBar onEnter={this.handleEnter} />;
    }
    if (status == 'esquire') {
      return <SuperSideBar onEnter={this.handleEnter} />;
    } else {
      return null;
    }
  };

  render() {
    const { layout } = this.state;
    const { onSuccess } = this.props;
    return (
      <>
        {this.defineSideBar()}
        <OfficeBody layout={layout} onSuccess={onSuccess} />
      </>
    );
  }
}
