import './Registration.scss';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

export class TestMail extends Component {
  state = {
    email: '',
  };
  handleRegIn = () => {
    let { email } = this.state;
    email = email.replace(/\s/g, '');
    console.log('sent from browser');
    if (!email == '') {
      fetch('http://localhost:8888/test-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          console.log('succesful mail sending');
          return response.json();
        })
        .then(data => {
          //this.handleSendMail()
        });
    }
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  handleCheckActive = () => {
    this.setState({ active: !this.state.active });
  };
  render() {
    const { email } = this.state;
    const { adminStatus, isSelfReg } = this.props;

    return (
      <>
        <div className="reg-wrap">
          <div className="reg">
            <h3>Sending mail test page</h3>

            <span>* Email:</span>
            <input
              required
              onChange={this.handleTextChange}
              name="email"
              type="text"
              value={email}
              placeholder="email"
            />

            <button onClick={this.handleRegIn}>отправить</button>
          </div>
        </div>
      </>
    );
  }
}
