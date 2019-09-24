import './GetDocs.scss';

import React, { Component } from 'react';

import { GetDoc } from 'components/GetDoc';

export class GetDocs extends Component {
  state = {
    display: false,
    docs: [],
  };

  handleDocs = () => {
    this.setState({ display: !this.state.display });
    const { userId } = this.props;
    const id = userId;
    fetch(`http://localhost:8888/udoc-list/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json(response);
      })
      .then(data => {
        this.setState({ docs: data.userDoc });
      });
  };

  render() {
    const { docs, display } = this.state;

    let docList;
    if (docs.length >= 1) {
      docList = docs.map(doc => {
        return <GetDoc key={doc._id} {...doc} />;
      });
    }
    if (docs.length < 1) {
      docList = <span>у пользователя нет сохранентых документов</span>;
    }

    return (
      <div>
        <p onClick={this.handleDocs}>показать документы пользователя</p>
        {display && <ul>{docList}</ul>}
      </div>
    );
  }
}
