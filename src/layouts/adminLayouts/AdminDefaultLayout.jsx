import React, { Component } from 'react';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:8888');

import { Alert } from 'components/Alert';
import { UserToApprove } from 'components/UserToApprove';

export class AdminDefaultLayout extends Component {
  state = {
    socketData: {},
    alert: false,
    tempUsers: [],
    usersToApprove: [],
    displayUser: false,
  };
  componentDidMount() {
    this.fetchTempUser();
    const room = 'admin-room';
    socket.emit('join', room);
    socket.emit('getTempUsers');
    socket.on('userToApprove', data => {
      const responseMessage =
        'Попытка изменить данные требующие Вашего подтверждения.';

      alert(responseMessage);
      console.log(data);
      this.setState({ socketData: data, alert: true });
      this.fetchTempUser();
    });
  }
  componentWillUnmount() {
    socket.disconnect();
  }

  fetchTempUser = () => {
    fetch('http://localhost:8888/tempusers', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ tempUsers: data });
        if (data.length) {
          this.setState({ alert: true });
        }
      });
  };

  alertClose = () => {
    this.setState({ alert: false });
  };

  render() {
    const { tempUsers, alert } = this.state;

    const user = tempUsers.map(i => {
      return (
        <UserToApprove
          key={i.userId}
          user={i}
          onAdminDecision={this.fetchTempUser}
          onAlertStop={this.alertClose}
        />
      );
    });
    return (
      <div>
        {alert && (
          <>
            <Alert />
          </>
        )}
        {user}
      </div>
    );
  }
}
