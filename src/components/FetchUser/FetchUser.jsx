import './FetchUser.scss';
import React, { Component, Fragment } from 'react';

export class FetchUser extends Component {
  state = {
    foundChild: [],
  };
  componentDidMount() {
    const { child } = this.props;
    const { parent } = this.props;

    if (child !== undefined) {
      this.props.child.map(i => {
        const id = i;
        this.handleFetchChild(id);
      });
    }
    if (parent !== undefined) {
      const id = parent;
      this.handleFetchChild(id);
    }
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
        console.log('the user was found');
      });
  };

  render() {
    const { foundChild } = this.state;

    const child = foundChild.map(i => {
      return (
        <Fragment key={i.user._id}>
          <p onClick={this.handleEditChild}>
            {i.user.firstName} {i.user.lastName}
          </p>
        </Fragment>
      );
    });
    return <>{child}</>;
  }
}
