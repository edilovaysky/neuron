import './NavbarItem.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavbarItem extends Component {
  handleActive = () => {
    const { onEnter, title } = this.props;
    onEnter(title);
  };
  render() {
    const { color, link, title, str } = this.props;
    return (
      <li className={`navbar-item`}>
        <Link className={color} to={link}>
          <p className={str} onClick={this.handleActive}>
            {title}
          </p>
        </Link>
      </li>
    );
  }
}
