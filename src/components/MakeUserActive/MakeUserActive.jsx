import './MakeUserActive.scss';

import React, { Component } from 'react';

export class MakeUserActive extends Component {
  state = {
    paramsId: this.props.id,
    display: false,
    fetch: true,
  };
  componentDidMount() {
    const id = this.state.paramsId;
    if (fetch) {
      fetch(`http://localhost:8888/user/${id}`, {
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
          //console.log(Date.parse(data.timeStamp));
          const period = 60 * 60 * 72 * 1000;
          const timeStamp = Date.parse(data.timeStamp);
          const timeNow = new Date().valueOf();
          const diff = timeNow - timeStamp;
          if (data.active) {
            alert('Вы уже ранее активировали свой аккаунт');
          } else if (diff <= period) {
            const active = true;
            const url = `http://localhost:8888/users/${data._id}`;
            fetch(url, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                active,
              }),
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Wrong credentials');
                }
                return response.json();
              })
              .then(data => {
                this.setState({ display: true });
              });
          } else {
            alert('ссылка устарела, обратитесь к администратору за активацией');
          }
        });
    }
  }
  componentWillUnmount() {
    this.setState({ fetch: false });
  }
  render() {
    const { display } = this.state;
    return (
      <div className="make-active-wrap">
        {display && (
          <>
            <p className="make-active-message">
              Вы успешно активировали свой аккаунт! <br /> для входа кликните
              пункт "авторизация" и наслаждайтесь ;)
            </p>
          </>
        )}
      </div>
    );
  }
}
