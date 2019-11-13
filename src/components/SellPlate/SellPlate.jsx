import './SellPlate.scss';
import React, { Component } from 'react';

import { SellItem } from 'components/SellItem';

export class SellPlate extends Component {
  state = {
    sellItems: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  };
  render() {
    const { sellItems } = this.state;
    const { courses } = this.props;
    console.log(courses);
    const item = courses.map(i => {
      console.log(i);
      return <SellItem key={i._id} i={i} />;
    });
    return <div className="sell-plate-wrap">{item}</div>;
  }
}
