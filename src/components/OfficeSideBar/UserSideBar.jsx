import React, { Component } from 'react';
import { Logo } from 'components/Logo';
export class UserSideBar extends Component {
  state = {
    classRoom: '',
    courses: '',
    tutor: '',
    userProfile: '',
    sellPage: '',
  };
  handleEnter = event => {
    const { onEnter } = this.props;
    const value = event.target.id;
    onEnter(value);
    if (value == 'classRoom') {
      this.setState({
        classRoom: 'active',
        courses: '',
        tutor: '',
        userProfile: '',
        sellPage: '',
      });
    }
    if (value == 'courses') {
      this.setState({
        courses: 'active',
        classRoom: '',
        tutor: '',
        userProfile: '',
        sellPage: '',
      });
    }
    if (value == 'tutor') {
      this.setState({
        tutor: 'active',
        classRoom: '',
        courses: '',
        userProfile: '',
        sellPage: '',
      });
    }
    if (value == 'user-profile') {
      this.setState({
        tutor: '',
        classRoom: '',
        courses: '',
        userProfile: 'active',
        sellPage: '',
      });
    }
    if (value == 'sellPage') {
      this.setState({
        tutor: '',
        classRoom: '',
        courses: '',
        userProfile: '',
        sellPage: 'active',
      });
    }

    event.preventDefault();
  };
  render() {
    const { classRoom, courses, tutor, userProfile, sellPage } = this.state;
    const { status } = this.props;
    return (
      <>
        <div className="side-nav-bar">
          <ul>
            <Logo />
            <li
              id="user-profile"
              className={`side-btn-${userProfile}`}
              onClick={this.handleEnter}
            >
              {status == 'user' ? <>профиль</> : <>мой профиль</>}
            </li>
            <li
              id="sellPage"
              className={`side-btn-${sellPage}`}
              onClick={this.handleEnter}
            >
              <>все курсы</>
            </li>
            <li
              id="classRoom"
              className={`side-btn-${classRoom}`}
              onClick={this.handleEnter}
            >
              {status == 'user' ? <>класс</> : <>мой класс</>}
            </li>
            <li
              id="courses"
              className={`side-btn-${courses}`}
              onClick={this.handleEnter}
            >
              {status == 'user' ? <>курсы</> : <>мои курсы</>}
            </li>
            <li
              id="tutor"
              className={`side-btn-${tutor}`}
              onClick={this.handleEnter}
            >
              {status == 'user' ? <>тьютор</> : <>мой тьютор</>}
            </li>
          </ul>
        </div>
      </>
    );
  }
}
