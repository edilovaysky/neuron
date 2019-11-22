import './Btn.scss';
import React, { Component } from 'react';

export class Btn extends Component {
  handleClick = event => {
    const { onBtnClick } = this.props;
    onBtnClick(event);
  };
  render() {
    const { btnName } = this.props;
    return (
      <button className="standart-btn" onClick={this.handleClick}>
        {btnName}
      </button>
    );
  }
}
