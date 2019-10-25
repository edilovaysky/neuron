import './MakePassRecover.scss';

import React, { Component } from 'react';
import { Change } from 'components/Change';
import { Loading } from 'components/Loading';

export class MakePassRecover extends Component {
  state = {
    paramsId: this.props.id,
    displayChange: false,
    displayLoading: true,
    fetch: false,
  };
  componentDidMount() {
    const id = this.state.paramsId;
    this.setState({ fetch: true });
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
          const period = 60 * 60 * 12 * 1000;
          const timeStamp = Date.parse(data.initPassRecoverDate);
          const timeNow = new Date().valueOf();
          const diff = timeNow - timeStamp;
          if (diff <= period) {
            this.setState({ displayChange: true, displayLoading: false });
          } else {
            alert(
              'ссылка устарела, запросите ссылку на изменение пароля еще раз.'
            );
          }
        });
    }
  }
  componentWillUnmount() {
    this.setState({ fetch: false });
  }
  handleSuccessPassChange = () => {
    this.setState({ displayChange: false });
  };
  render() {
    const { displayChange, paramsId, displayLoading } = this.state;
    const id = { _id: paramsId };
    const { parent } = this.props;

    return (
      <div className="make-pass-recover-wrap">
        {displayLoading && <Loading />}
        {displayChange && (
          <Change
            userToEdit={id}
            onSuccessPassChange={this.handleSuccessPassChange}
            parent={parent}
          />
        )}
      </div>
    );
  }
}
