import './ChosenUser.scss';
import React, { Component, Fragment } from 'react';

export class ChosenUser extends Component {
  render() {
    const { chosen } = this.props;
    const element = chosen;
    const { users } = this.props;
    const user = users.map((i, index) => {
      if (element == i.props._id) {
        return (
          <Fragment key={index}>
            <span>Вы выбрали ученика: </span>
            <li>
              {i.props.lastName} {i.props.firstName} {i.props.patronymic}
            </li>
          </Fragment>
        );
      }
    });
    return (
      <>
        <ul>{user}</ul>
      </>
    );
  }
}
