import React, { Component } from 'react';

export class TeacherSideBar extends Component {
  state = {
    classes: '',
    iTutor: '',
    userProfile: '',
  };
  handleEnter = event => {
    const { onEnter } = this.props;
    const value = event.target.id;
    onEnter(value);
    if (value == 'teacher-profile') {
      this.setState({
        iTutor: '',
        classes: '',
        userProfile: 'active',
      });
    }
    if (value == 'classes') {
      this.setState({ classes: 'active', iTutor: '', userProfile: '' });
    }
    if (value == 'iTutor') {
      this.setState({ classes: '', iTutor: 'active', userProfile: '' });
    }
    event.preventDefault();
  };
  render() {
    const { classes, iTutor, userProfile } = this.state;
    return (
      <>
        <div className="side-nav-bar">
          <ul>
            <li className="logo">
              <img src="../../../src/assets/logo.png" alt="Neuron-logo" />
            </li>
            <li
              id="teacher-profile"
              className={`side-btn-${userProfile}`}
              onClick={this.handleEnter}
            >
              мой профиль
            </li>
            <li
              id="classes"
              className={`side-btn-${classes}`}
              onClick={this.handleEnter}
            >
              классы
            </li>
            <li
              id="iTutor"
              className={`side-btn-${iTutor}`}
              onClick={this.handleEnter}
            >
              я tutor
            </li>
          </ul>
        </div>
      </>
    );
  }
}
