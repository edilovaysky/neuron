import './User.scss';
import React, { Component } from 'react';

import { Editing } from 'components/Editing';

export class User extends Component {
  state = {
    display: false,
    edit: false,
  };

  handleDisplay = () => {
    this.setState({ display: !this.state.display });
  };

  handleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };
  render() {
    const { lastName, firstName, patronymic, active, findMarker } = this.props;
    const { display, edit } = this.state;
    let isActive;
    if (active) {
      isActive = '* активен';
    } else {
      isActive = '* не активен';
    }

    return (
      <>
        {this.props.page == 'otherPages' && (
          <div className="card-wraper">
            <div className="card-header">
              <p onClick={this.handleDisplay}>
                {lastName} {firstName} {patronymic}
              </p>
              {findMarker && <>{isActive}</>}
            </div>
            {display && (
              <div className="card-body">
                <p>дата рождения: {this.props.dateOfBirth}</p>
                <p>место проживания: {this.props.city}</p>
                {this.props.status == 'user' && (
                  <p>ФИО родителя: {this.props.parentName}</p>
                )}
                <p>телефон: {this.props.tel}</p>
                <p>e-mail: {this.props.email}</p>
                <button className="user-edit-btn" onClick={this.handleEdit}>
                  редактировать
                </button>
                <button className="user-edit-btn">документы</button>
                {edit && <Editing userToEdit={this.props} />}
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}
