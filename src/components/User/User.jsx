import './User.scss';
import React, { Component } from 'react';

import { Editing } from 'components/Editing';
import { FileLoader } from 'components/FileLoader';
import { DragAndDrop } from 'components/DragAndDrop';
import { GetDocs } from 'components/GetDocs';

export class User extends Component {
  state = {
    display: false,
    edit: false,
    displayLoader: false,
  };

  handleDisplay = () => {
    this.setState({ display: !this.state.display });
  };

  handleDisplayFile = () => {
    this.setState({ displayLoader: !this.state.displayLoader });
  };

  handleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };
  render() {
    const {
      lastName,
      firstName,
      patronymic,
      active,
      findMarker,
      userStatus,
      userId,
    } = this.props;

    const { display, edit, displayLoader } = this.state;
    let isActive;
    if (active) {
      isActive = '* активен';
    } else {
      isActive = '* не активен';
    }
    const docType = 'udoc';
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
                <button
                  className="user-edit-btn"
                  onClick={this.handleDisplayFile}
                >
                  документы
                </button>
                {displayLoader && (
                  <>
                    <div className="card-body-span">
                      <span>загрука документов пользователя</span>
                    </div>
                    <DragAndDrop docType={docType} userId={userId} />
                    <div className="card-body-span">
                      <span>просмотр документов пользователя</span>
                    </div>
                    <GetDocs userId={userId} userStatus={userStatus} />
                  </>
                )}
                {edit && (
                  <Editing userToEdit={this.props} userStatus={userStatus} />
                )}
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}
