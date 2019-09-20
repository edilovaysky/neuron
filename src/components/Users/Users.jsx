import './Users.scss';
import React, { Component } from 'react';
import { User } from 'components/User';
import { FindUser } from 'components/FindUser';

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: '',
      display: false,
      displayInactive: false,
    };
  }

  handleDisplay = () => {
    this.setState({ display: !this.state.display });
  };
  handleDisplayInactive = () => {
    this.setState({ displayInactive: !this.state.displayInactive });
  };
  render() {
    const { page, status, active, userStatus, userId } = this.props;
    const mapping = {
      user: 'ученики: ',
      teacher: 'учителя: ',
      admin: 'администраторы: ',
    };

    const { display, displayInactive } = this.state;
    const users = this.props.users.map(user => {
      if (user.active == active) {
        return (
          <User
            key={user._id}
            {...user}
            page={page}
            userStatus={userStatus}
            userId={user._id}
          />
        );
      }
    });
    const inactive = this.props.users.map(user => {
      if (!user.active == active) {
        return (
          <User
            key={user._id}
            {...user}
            page={page}
            userStatus={userStatus}
            userId={user._id}
          />
        );
      }
    });
    return (
      <div className="users-wrap">
        <FindUser
          users={users}
          page={page}
          status={status}
          userStatus={userStatus}
        />
        <h3 onClick={this.handleDisplay}>{mapping[status]}</h3>
        {display && <>{users} </>}
        <h3 onClick={this.handleDisplayInactive}>
          не активные {mapping[status]}
        </h3>
        {displayInactive && <>{inactive} </>}
      </div>
    );
  }
}
