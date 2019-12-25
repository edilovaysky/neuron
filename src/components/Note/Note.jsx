import './Note.scss';
import React, { Component } from 'react';

export class Note extends Component {
  handleClick = () => {
    const { onNotesClick } = this.props;
    onNotesClick();
  };
  render() {
    const { msg } = this.props;
    return (
      <div onClick={this.handleClick}>
        <p className="p-notes">{msg}</p>
      </div>
    );
  }
}
