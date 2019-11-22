import './BtnClose.scss';
import React, { Component } from 'react';

export class BtnClose extends Component {
  handleClick = () => {
    const { onBtnClick } = this.props;
    onBtnClick();
  };
  render() {
    return (
      <div className="btn-close" onClick={this.handleClick}>
        <hr className="btn-close-item-1" />
        <hr className="btn-close-item-2" />
      </div>
    );
  }
}
