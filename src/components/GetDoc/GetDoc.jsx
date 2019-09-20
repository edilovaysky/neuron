import './GetDoc.scss';

import React, { Component } from 'react';

export class GetDoc extends Component {
  state = {
    display: false,
  };

  handleDocs = () => {
    this.setState({ display: !this.state.display });
    fetch(`http://localhost:8888/upload/udoc/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response);
  };
  render() {
    return (
      <div>
        <p onClick={this.handleDocs}>показать документы пользователя</p>
      </div>
    );
  }
}
