import React, { Component } from 'react';

export class UserSideBar extends Component {
  state = {
    classRoom: '',
    courses: '',
    tutor: '',
  };
  handleEnter = event => {
    const { onEnter } = this.props;
    const value = event.target.id;
    onEnter(value);
    if (value == 'classRoom') {
      this.setState({ classRoom: 'active', courses: '', tutor: '' });
    }
    if (value == 'courses') {
      this.setState({ courses: 'active', classRoom: '', tutor: '' });
    }
    if (value == 'tutor') {
      this.setState({ tutor: 'active', classRoom: '', courses: '' });
    }

    event.preventDefault();
  };
  render() {
    const { classRoom, courses, tutor } = this.state;
    return (
      <>
        <div className="side-nav-bar">
          <ul>
            <li className="logo">
              <img src="../../../src/assets/logo.png" alt="Neuron-logo" />
            </li>
            <li
              id="classRoom"
              className={`side-btn-${classRoom}`}
              onClick={this.handleEnter}
            >
              мой класс
            </li>
            <li
              id="courses"
              className={`side-btn-${courses}`}
              onClick={this.handleEnter}
            >
              мои курсы
            </li>
            <li
              id="tutor"
              className={`side-btn-${tutor}`}
              onClick={this.handleEnter}
            >
              мой тьютор
            </li>
          </ul>
        </div>
      </>
    );
  }
}
