import './UserSellBoxesLayout.scss';

import React, { Component } from 'react';
import { SellPlate } from 'components/SellPlate';

export class UserSellBoxesLayout extends Component {
  state = {
    sellBoxes: [],
  };
  componentDidMount() {
    fetch(`http://localhost:8888/sellboxes`, {
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
        const { sellboxes } = data;
        this.setState({ sellBoxes: sellboxes, displaySellPlate: true });
      });
  }

  render() {
    const { sellBoxes } = this.state;

    return (
      <div className="sell-box-wrapper">
        <SellPlate sellBoxes={sellBoxes} />
      </div>
    );
  }
}
