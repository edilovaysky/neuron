import './OfficeTopBar.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { OfficeTopBarContainer } from 'containers/OfficeTopBarContainer';

export class OfficeTopBar extends Component {
  render() {
    const { onSignOut } = this.props;
    return (
      <>
        <OfficeTopBarContainer onSignOut={onSignOut} />
        <hr />
      </>
    );
  }
}
