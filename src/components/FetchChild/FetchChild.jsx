import './FetchChild.scss';
import React, { Component } from 'react';

export class FetchChild extends Component {
  state = {
    foundChild: [],
  };
  componentWillMount() {
    this.props.child.map(i => {
      const id = i;
      this.handleFetchChild(id);
    });
  }
  handleFetchChild = id => {
    fetch(`http://localhost:8888/child/${id}`, {
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
        this.setState({ foundChild: [...this.state.foundChild, data] });
        console.log('the child was found');
      });
  };
  render() {
    const { foundChild } = this.state;

    const child = foundChild.map(i => {
      return (
        <p key={i.user._id}>
          {i.user.firstName} {i.user.lastName}
        </p>
      );
    });
    return <>{child}</>;
  }
}
