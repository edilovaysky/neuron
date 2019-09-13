import './Office.scss';

import React, { Component } from 'react';

import { OfficeTopBar } from 'components/OfficeTopBar';
import { OfficeSideBarContainer } from 'containers/OfficeSideBarContainer';

export class Office extends Component {
  render() {
    const { onSignOut } = this.props;
    return (
      <div className="office">
        <OfficeTopBar onSignOut={onSignOut} />
        <OfficeSideBarContainer />
      </div>
    );
  }
}
