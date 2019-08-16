import React, { Component } from 'react';

export class SuperSideBar extends Component {
  state = {
    users: '',
    classes: '',
    courses: '',
    tutors: '',
    sup: '',
  };
  handleEnter = event => {
    const { onEnter } = this.props;
    const value = event.target.id;
    onEnter(value);
    if (value == 'all-users') {
      this.setState({
        users: 'active',
        classes: '',
        courses: '',
        tutors: '',
        sup: '',
      });
    }
    if (value == 'all-classes') {
      this.setState({
        users: '',
        classes: 'active',
        courses: '',
        tutors: '',
        sup: '',
      });
    }
    if (value == 'all-courses') {
      this.setState({
        users: '',
        classes: '',
        courses: 'active',
        tutors: '',
        sup: '',
      });
    }
    if (value == 'all-tutors') {
      this.setState({
        users: '',
        classes: '',
        courses: '',
        tutors: 'active',
        sup: '',
      });
    }
    if (value == 'super') {
      this.setState({
        users: '',
        classes: '',
        courses: '',
        tutors: '',
        sup: 'active',
      });
    }
    event.preventDefault();
  };
  render() {
    const { classes, users, courses, tutors, sup } = this.state;
    return (
      <>
        <div className="side-nav-bar">
          <ul>
            <li className="logo">
              <img src="../../../src/assets/logo.png" alt="Neuron-logo" />
            </li>
            <li
              id="all-users"
              className={`side-btn-${users}`}
              onClick={this.handleEnter}
            >
              пользователи
            </li>
            <li
              id="all-classes"
              className={`side-btn-${classes}`}
              onClick={this.handleEnter}
            >
              классы
            </li>
            <li
              id="all-courses"
              className={`side-btn-${courses}`}
              onClick={this.handleEnter}
            >
              курсы
            </li>
            <li
              id="all-tutors"
              className={`side-btn-${tutors}`}
              onClick={this.handleEnter}
            >
              репетиторы
            </li>
            <li
              id="super"
              className={`side-btn-${sup}`}
              onClick={this.handleEnter}
            >
              i super
            </li>
          </ul>
        </div>
      </>
    );
  }
}
