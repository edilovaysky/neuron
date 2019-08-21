import './Users.scss';
import React, { Component } from 'react';
import { User } from 'components/User';

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: '',
      foundUsers: [],
      display: false,
    };
  }
  handleDisplay = () => {
    this.setState({ display: !this.state.display });
  };

  handleCleanFoundUser = () => {
    this.setState({ foundUsers: [] });
  };

  handleFind = () => {
    let { lastName } = this.state;
    const status = this.props.users[0].status;
    console.log(status);
    lastName = lastName.replace(/\s/g, '');
    if (!lastName == '') {
      fetch(
        `http://localhost:8888/find-users?lastName=${lastName}&status=${status}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          console.log(`${status}/s were found`);
          return response.json(response);
        })
        .then(data => {
          this.setState({ foundUsers: data.foundUsers });
        });
    }
  };
  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { lastName, foundUsers, display } = this.state;
    console.log(foundUsers);
    const foundArr = foundUsers.map(found => {
      return <User key={found._id} {...found} />;
    });
    const users = this.props.users.map(user => {
      return <User key={user._id} {...user} />;
    });
    return (
      <div className="users-wrap">
        <input
          required
          onChange={this.handleTextChange}
          name="lastName"
          type="text"
          value={lastName}
          placeholder="введите фамилию"
        />
        <button onClick={this.handleFind}>найти</button>
        <button onClick={this.handleCleanFoundUser}>очистить</button>
        {foundArr}
        <h3 onClick={this.handleDisplay}>Пользователи</h3>
        {display && <>{users}</>}
      </div>
    );
  }
}
