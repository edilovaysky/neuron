import './SquareCheckBox.scss';
import React, { Component } from 'react';

export class SquareCheckBox extends Component {
  state = {
    checked: false,
  };
  handleCheck = ({ target: { id } }) => {
    const { onCheck } = this.props;
    const { checked } = this.state;
    if (!checked) {
      const checked = true;
      onCheck(id, checked);
      this.setState({ checked: true });
    }
    if (checked) {
      const checked = false;
      onCheck(id, checked);
      this.setState({ checked: false });
    }
  };
  render() {
    const { checkBoxId, labelMsg } = this.props;
    return (
      <>
        <input type="checkbox" id={checkBoxId} onClick={this.handleCheck} />
        <label className="square-checkbox-label" htmlFor={checkBoxId}>
          <span>{labelMsg}</span>
        </label>
      </>
    );
  }
}
