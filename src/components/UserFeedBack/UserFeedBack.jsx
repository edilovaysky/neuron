import './UserFeedBack.scss';
import React, { Component } from 'react';

export class UserFeedBack extends Component {
  render() {
    return (
      <div className="feedback-wraper">
        <form action="" className="postcard">
          <div className="form-row">
            <label htmlFor="name">Ваше имя</label>
            <input type="text" id="name" required />
          </div>
          <div className="form-row">
            <label htmlFor="email">Ваш Email</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-row">
            <label htmlFor="message">Ваше сообщение</label>{' '}
            <textarea rows="5" id="message" required></textarea>
          </div>
          <div className="form-row">
            <input type="submit" value="Отправить сообщение" />
          </div>
        </form>
      </div>
    );
  }
}
