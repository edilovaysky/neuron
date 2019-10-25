import './PassRecover.scss';
import React, { Component } from 'react';

export class PassRecover extends Component {
  state = {
    email: '',
  };
  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  handleRecover = () => {
    const { onRequest } = this.props;
    const { email } = this.state;
    fetch(`http://localhost:8888/user/recover/${email}`, {
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
        alert(
          'На Ваш email отправлена ссылка на изменение пароля. Ссылка действительна в течение 12 часов с момента запроса.'
        );
        onRequest();
        /* console.log(data);
        const dateNow = new Date().valueOf();
        const period = 60 * 60 * 12 * 1000;
        const diff = dateNow - data.initRecDate;
        if (diff > period) {
          alert('Ссылка по которой вы зашли уже не действительна. Запросите ссылку заново.')
        } */
      });
  };
  render() {
    const { email } = this.state;
    return (
      <div className="pass-recover-wraper">
        <p>Вам на email будет направлена ссылка для восстановленя пароля.</p>
        <span>email: </span>
        <input
          required
          onChange={this.handleTextChange}
          name="email"
          type="email"
          value={email}
          placeholder="Введите свой email"
        />
        <br />
        <button onClick={this.handleRecover}>восстановить</button>
      </div>
    );
  }
}
