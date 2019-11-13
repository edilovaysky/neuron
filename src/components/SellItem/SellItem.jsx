import './SellItem.scss';
import React, { Component } from 'react';

export class SellItem extends Component {
  render() {
    const { i } = this.props;
    return (
      <div className="sell-item-wrap">
        <p>курс за {i.studyYear}-класс.</p>
        <p>купить этот курс </p>
      </div>
    );
  }
}
