import React, { Component } from 'react';

export class TeacherSideBar extends Component {
  state = {
    classes: '',
    iTutor: '',
  };
  handleEnter = event => {
    const { onEnter } = this.props;
    const value = event.target.id;
    onEnter(value);
    if (value == 'classes') {
      this.setState({ classes: 'active', iTutor: '' });
    }
    if (value == 'iTutor') {
      this.setState({ classes: '', iTutor: 'active' });
    }
    event.preventDefault();
  };
  render() {
    const { classes, iTutor } = this.state;
    return (
      <>
        <div className="side-nav-bar">
          <ul>
            <li className="logo">
              <img src="../../../src/assets/logo.png" alt="Neuron-logo" />
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
