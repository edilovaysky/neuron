import './Navbar.scss';

import React, { Component } from 'react';

import { NavbarItem } from 'components/NavbarItem';

export class Navbar extends Component {
  state = {
    home: {
      link: '/',
      color: 'sky',
      title: 'главная',
      str: '',
    },
    auth: {
      link: '/auth',
      color: 'sky',
      title: 'авторизация',
      str: '',
    },
    reg: {
      link: '/reg',
      color: 'sky',
      title: 'регистрация',
      str: '',
    },
    feedback: {
      link: '/feedback',
      color: 'sky',
      title: 'написать',
      str: '',
    },
  };
  handleEnter = title => {
    if (title == 'главная') {
      const { home, auth, reg, feedback } = this.state;
      home.str = 'nav-item-active';
      auth.str = '';
      reg.str = '';
      feedback.str = '';
      this.setState({ home: home, auth: auth, reg: reg, feedback: feedback });
    }
    if (title == 'авторизация') {
      const { home, auth, reg, feedback } = this.state;
      home.str = '';
      auth.str = 'nav-item-active';
      reg.str = '';
      feedback.str = '';
      this.setState({ home: home, auth: auth, reg: reg, feedback: feedback });
    }
    if (title == 'регистрация') {
      const { home, auth, reg, feedback } = this.state;
      home.str = '';
      auth.str = '';
      reg.str = 'nav-item-active';
      feedback.str = '';
      this.setState({ home: home, auth: auth, reg: reg, feedback: feedback });
    }
    if (title == 'написать') {
      const { home, auth, reg, feedback } = this.state;
      home.str = '';
      auth.str = '';
      reg.str = '';
      feedback.str = 'nav-item-active';
      this.setState({ home: home, auth: auth, reg: reg, feedback: feedback });
    }
  };
  render() {
    const { home, auth, reg, feedback } = this.state;
    return (
      <ul className="navbar">
        <NavbarItem {...home} onEnter={this.handleEnter} />
        <NavbarItem {...auth} onEnter={this.handleEnter} />
        <NavbarItem {...reg} onEnter={this.handleEnter} />
        <NavbarItem {...feedback} onEnter={this.handleEnter} />
      </ul>
    );
  }
}
