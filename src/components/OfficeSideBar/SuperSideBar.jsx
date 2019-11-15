import React, { Component } from 'react';
import { Logo } from 'components/Logo';
export class SuperSideBar extends Component {
  state = {
    users: '',
    classes: '',
    courses: '',
    tutors: '',
    sellBoxes: '',
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
        sellBoxes: '',
      });
    }
    if (value == 'all-classes') {
      this.setState({
        users: '',
        classes: 'active',
        courses: '',
        tutors: '',
        sellBoxes: '',
      });
    }
    if (value == 'all-courses') {
      this.setState({
        users: '',
        classes: '',
        courses: 'active',
        tutors: '',
        sellBoxes: '',
      });
    }
    if (value == 'all-tutors') {
      this.setState({
        users: '',
        classes: '',
        courses: '',
        tutors: 'active',
        sellBoxes: '',
      });
    }
    if (value == 'sellBoxes') {
      this.setState({
        users: '',
        classes: '',
        courses: '',
        tutors: '',
        sellBoxes: 'active',
      });
    }
    event.preventDefault();
  };
  render() {
    const { classes, users, courses, tutors, sellBoxes } = this.state;
    return (
      <>
        <div className="side-nav-bar">
          <ul>
            <Logo />
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
              id="sellBoxes"
              className={`side-btn-${sellBoxes}`}
              onClick={this.handleEnter}
            >
              sellBoxes
            </li>
          </ul>
        </div>
      </>
    );
  }
}
