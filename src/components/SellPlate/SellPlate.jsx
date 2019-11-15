import './SellPlate.scss';
import React, { Component } from 'react';

import { SellItem } from 'components/SellItem';

export class SellPlate extends Component {
  render() {
    const { sellBoxes } = this.props;

    const item = sellBoxes.map(sellItem => {
      return <SellItem key={sellItem._id} sellItem={sellItem} />;
    });
    return <div className="sell-plate-wrap">{item}</div>;
  }
}
