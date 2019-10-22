import './UserToApprove.scss';
import React, { Component } from 'react';

export class UserToApprove extends Component {
  state = {
    userToCompare: {},
    display: false,
    dispYes: true,
    dispNo: true,
    dispApprove: false,
  };

  handleUser = () => {
    const id = this.props.user.userId;
    fetch(`http://localhost:8888/user/${id}`, {
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
        this.setState({ userToCompare: data });
      });
    this.setState({ display: !this.state.display });
  };

  handleApproveYes = () => {
    this.setState({
      dispNo: !this.state.dispNo,
      dispApprove: !this.state.dispApprove,
    });
  };

  handleApproveNo = () => {
    this.setState({
      dispYes: !this.state.dispYes,
      dispApprove: !this.state.dispApprove,
    });
  };

  handleApproveApprove = () => {
    this.setState({ dispApprove: !this.state.dispApprove });

    let url;
    if (this.state.dispApprove && this.state.dispNo) {
      const id = this.props.user._id;
      url = `http://localhost:8888/tempuser-delete/${id}`;
    }
    if (this.state.dispApprove && this.state.dispYes) {
      const id = this.props.user.userId;
      url = `http://localhost:8888/put-approve-user/${id}`;
    }

    const { user } = this.props;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        const { onAdminDecision, onAlertStop } = this.props;
        onAdminDecision();
        onAlertStop();
      });
  };

  render() {
    const { user } = this.props;
    const { userToCompare, display, dispNo, dispYes, dispApprove } = this.state;

    const useCheck = () => {
      return (
        <>
          {' '}
          <span>одобрить данное изменение? </span>
          <div className="approve-check-wraper">
            {dispYes && (
              <>
                <input
                  type="checkbox"
                  id="yes"
                  onClick={this.handleApproveYes}
                />
                <label className="approve-check-lable" htmlFor="yes">
                  <span>ДА</span>
                </label>
              </>
            )}
            {dispNo && (
              <>
                <input type="checkbox" id="no" onClick={this.handleApproveNo} />
                <label className="approve-check-lable" htmlFor="no">
                  <span>НЕТ</span>
                </label>
              </>
            )}
            {dispApprove && (
              <>
                <input
                  type="checkbox"
                  id="approve"
                  onClick={this.handleApproveApprove}
                />
                <label className="approve-check-lable" htmlFor="approve">
                  <span>ПОДТВЕРДИТЬ ДЕЙСТВИЕ</span>
                </label>
              </>
            )}
          </div>
        </>
      );
    };

    let dispFirstName,
      dispLastName,
      dispDateOfBirth = false;
    if (userToCompare.firstName !== user.firstName) {
      dispFirstName = true;
    }
    if (userToCompare.lastName !== user.lastName) {
      dispLastName = true;
    }
    if (userToCompare.dateOfBirth !== user.dateOfBirth) {
      dispDateOfBirth = true;
    }

    return (
      <div>
        <span>запрос на редактирование данных пользователей: </span>
        <p onClick={this.handleUser}>
          {user.firstName} {user.lastName}
        </p>
        {display && (
          <div>
            {dispFirstName && (
              <>
                <span>родитель хочет изменить имя с </span>{' '}
                <p>{userToCompare.firstName}</p>
                <span>на </span>
                <p>{user.firstName}</p>
              </>
            )}
            {dispLastName && (
              <>
                <span>родитель хочет изменить фамилию с </span>{' '}
                <p>{userToCompare.lastName}</p>
                <span>на </span>
                <p>{user.lastName}</p>
              </>
            )}
            {dispDateOfBirth && (
              <>
                <span>родитель хочет изменить дату рождения с </span>{' '}
                <p>{userToCompare.dateOfBirth}</p>
                <span>на </span>
                <p>{user.dateOfBirth}</p>
              </>
            )}
            <span>Комментарий родилетя: </span>
            <p>{user.comment}</p>
            {(dispFirstName || dispLastName || dispDateOfBirth) && useCheck()}
          </div>
        )}
      </div>
    );
  }
}
