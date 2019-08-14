import './OfficeSideBar.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { UserSideBar } from './UserSideBar';
import { TeacherSideBar } from './TeacherSideBar';
import { AdminSideBar } from './AdminSideBar copy';

export class OfficeSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props,
    };
  }
  defineSideBar = () => {
    const { status } = this.state.status;
    if (status == 'user') {
      return UserSideBar();
    }
    if (status == 'teacher') {
      return TeacherSideBar();
    }
    if (status == 'admin') {
      return AdminSideBar();
    } else {
      return null;
    }
  };

  render() {
    return this.defineSideBar();
  }
}
