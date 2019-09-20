import './FindUser.scss';
import React, { Component } from 'react';
import { User } from 'components/User';
import { ChosenUser } from 'components/ChosenUser';

export class FindUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: '',
      foundUsers: [],
      display: false,
      pupil: '',
    };
  }

  handleCleanFoundUser = () => {
    this.setState({ foundUsers: [] });
  };

  handleFind = () => {
    let { lastName } = this.state;
    const { status } = this.props;

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
    if (name == 'pupil') {
      let v = { [name]: value };
      const { fetchPupil } = this.props;
      fetchPupil(v);
    }
  };
  render() {
    const { page, pupil, userStatus } = this.props;
    const chosen = pupil;

    const { lastName, foundUsers, display } = this.state;
    const foundArr = foundUsers.map(found => {
      const findMarker = true;
      return (
        <User
          key={found._id}
          {...found}
          page={page}
          findMarker={findMarker}
          userStatus={userStatus}
          userId={found._id}
        />
      );
    });
    let marker;
    const selectUser = foundUsers.map(user => {
      if (user.active) {
        marker = '   *активен';
      } else {
        marker = '   * не активен';
      }
      return (
        <option key={user._id} value={user._id}>
          {user.lastName} {user.firstName} {user.patronymic}
          {marker}
          {}
        </option>
      );
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
        {page == 'classReg' && (
          <select name="pupil" onChange={this.handleTextChange}>
            <option defaultValue>выберите ученика</option>
            {selectUser}
          </select>
        )}
        {page == 'classReg' && <ChosenUser users={foundArr} chosen={chosen} />}
      </div>
    );
  }
}
