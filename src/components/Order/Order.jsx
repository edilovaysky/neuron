import './Order.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class OrderInit extends Component {
  state = {
    user: '',
    userEmail: '',
    children: [],
    dispChose: false,
  };
  componentDidMount() {
    const { user } = this.props.user;
    console.log(user._id, user.email);
    if (!user.child) {
      this.setState({ user: user._id, userEmail: user.email });
    }
    if (user.child) {
      user.child.map(id => {
        fetch(`http://localhost:8888/user/${id}`, {
          headers: {
            ContenType: 'Application/json',
          },
        })
          .then(response => {
            if (!respose.ok) {
              throw new Error('Wrong credentials!');
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            this.setState({ children: [...this.state.children, data] });
          });
      });
      this.setState({ dispChose: true });
    }
  }
  handleOrderClose = () => {
    const { onClose } = this.props;
    onClose();
  };
  handleBuy = () => {
    const { sellItem } = this.props;
    const { user, userEmail } = this.state;
    console.log(userEmail);
    const sellBox = sellItem._id;
    const sellBoxName = sellItem.name;
    const period = sellItem.number * sellItem.period;
    const price = sellItem.price;
    const isPaid = false;
    const sum = sellItem.price;
    const email = userEmail;
    if (!email) {
      alert('Укажите свой email адрес обязательно!');
    }

    /*  fetch('http://localhost:8888/buy', {
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      }); */
  };

  render() {
    const { sellItem } = this.props;
    const { user, children } = this.state;
    let userList;
    if (children.length) {
      userList = children.map(child => {
        return (
          <p>
            {child.firstName} {child.className}
          </p>
        );
      });
    }
    //console.log(user);
    return (
      <div className="order-wrapper">
        <span>xnj</span>
        <button onClick={this.handleOrderClose}>закрыть</button>
        <button onClick={this.handleBuy}>оплатить курс</button>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.userAuth.entries,
  };
}

export const Order = connect(mapStateToProps)(OrderInit);
