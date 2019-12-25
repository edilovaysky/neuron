import './InputText.scss';
import React, { Component } from 'react';

export class InputText extends Component {
  state = {
    name: '',
  };
  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
    const { onDone } = this.props;
    onDone(name, value);
  };
  render() {
    const { inputName } = this.props;
    const { name } = this.state;
    return (
      <input
        className="input-text"
        type="text"
        name={inputName}
        value={name || ''}
        onChange={this.handleTextChange}
      />
    );
  }
}
