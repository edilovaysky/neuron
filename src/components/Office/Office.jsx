import './Office.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { OfficeTopBar } from 'components/OfficeTopBar';
import { OfficeSideBar } from 'components/OfficeSideBar';
import { OfficeBody } from 'components/OfficeBody';

export class Office extends Component {
  render() {
    const { onSignOut } = this.props;
    return (
      <div className="office">
        <OfficeTopBar onSignOut={onSignOut} />
        <OfficeSideBar />
        <OfficeBody />
      </div>
    );
  }
}
