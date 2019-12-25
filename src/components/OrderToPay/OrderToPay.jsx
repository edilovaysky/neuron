import './OrderToPay.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Btn } from 'components/Btn';
import { BtnClose } from 'components/BtnClose';
import { SquareCheckBox } from 'components/SquareCheckBox';
import { InputEmail } from 'components/InputEmail';

class OrderInit extends Component {
  state = {
    orders: [],
    child: [],
    sum: 0,
  };
  componentDidMount() {
    const { user } = this.props.user;
    const orders = user.orders;
    if (orders) {
      orders.map(id => {
        fetch(`http://localhost:8888/order/${id}`, {
          headers: {
            ContenType: 'Application/json',
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Wrong credentials!');
            }
            return response.json();
          })
          .then(data => {
            if (data) {
              this.setState({
                orders: [...this.state.orders, data],
                sum: this.state.sum + data.sum,
              });
              let id = data.user;
              fetch(`http://localhost:8888/user/${id}`, {
                headers: {
                  ContenType: 'Application/json',
                },
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Wrong credentials!');
                  }
                  return response.json();
                })
                .then(data => {
                  this.setState({ child: [...this.state.child, data] });
                });
            }
          });
      });
    }
  }
  handleDel = () => {
    const { orders } = this.state;
    orders.map(order => {
      console.log(order);
      const id = order._id;
      fetch(`http://localhost:8888/order-delete/${id}`, {
        headers: {
          ContenType: 'Application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials!');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
        });
    });
  };

  handleBuy = () => {};

  handleEmailChange = (name, value) => {
    /*  this.setState({ [name]: value }); */
  };

  render() {
    const { orders, child, sum } = this.state;

    const orderList = orders.map(order => {
      let match = false;
      let name;
      child.map(child => {
        if (order.user == child._id) {
          name = `${child.firstName} ${child.lastName}`;
          match = true;
        }
      });
      if (match) {
        return (
          <p key={order._id}>
            {order.sellBoxName} на {order.sum} рублей для {name}.
          </p>
        );
      }
    });

    return (
      <div className="order-to-pay-wrapper">
        <h3>Ваш заказ</h3>
        {orderList}
        <p>Сумма заказа {sum} рублей.</p>
        <div className="order-to-pay-btn">
          <Btn btnName={'удалить заказ'} onBtnClick={this.handleDel} />
          <Btn btnName={'оплатить заказ'} onBtnClick={this.handleBuy} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.userAuth.entries,
  };
}

export const OrderToPay = connect(mapStateToProps)(OrderInit);
