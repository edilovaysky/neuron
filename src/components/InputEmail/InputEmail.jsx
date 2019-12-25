import './InputEmail.scss';
import React, { Component } from 'react';

export class InputEmail extends Component {
  state = {
    email: '',
  };
  componentDidMount() {
    const { email } = this.props;
    if (email) {
      this.setState({ email: email });
    }
  }
  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
    const { onInput } = this.props;
    onInput(name, value);
  };
  render() {
    const { inputName, userEmail } = this.props;
    const { email } = this.state;

    return (
      <input
        className="input-email"
        type="email"
        name={inputName}
        value={email || ''}
        onChange={this.handleTextChange}
        placeholder={userEmail}
      />
    );
  }
}
