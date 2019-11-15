import './ForTest.scss';
import React, { Component } from 'react';

export class ForTest extends Component {
  handleTest = () => {
    const active = true;
    const url = `http://localhost:8888/lessons/delete`;
    const url2 = `http://localhost:8888/email-test`;

    fetch(url2, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        active,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="for-test-wrapper">
        <p onClick={this.handleTest}>push it to test</p>
      </div>
    );
  }
}
