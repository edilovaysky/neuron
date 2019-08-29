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
    };
  }

  handleDisplay = () => {
    this.setState({ display: !this.state.display });
  };
  render() {
    const { page, status } = this.props;
    const { display } = this.state;
    const users = this.props.users.map(user => {
      return <User key={user._id} {...user} page={page} />;
    });
    return (
      <div className="users-wrap">
        <FindUser users={users} page={page} status={status} />
        <h3 onClick={this.handleDisplay}>Пользователи</h3>
        {display && <>{users} }</>}
      </div>
    );
  }
}
