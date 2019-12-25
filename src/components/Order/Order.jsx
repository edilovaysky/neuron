import './Order.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Btn } from 'components/Btn';
import { BtnClose } from 'components/BtnClose';
import { SquareCheckBox } from 'components/SquareCheckBox';
import { InputEmail } from 'components/InputEmail';

class OrderInit extends Component {
  state = {
    user: '',
    userEmail: '',
    children: [],
    dispChose: false,
    payForUsers: [],
  };
  componentDidMount() {
    const { user } = this.props.user;
    this.setState({ children: [...this.state.children, user] });
    if (user.email) {
      this.setState({ userEmail: user.email });
    }

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
            if (!response.ok) {
              throw new Error('Wrong credentials!');
            }
            return response.json();
          })
          .then(data => {
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
  handleCheck = (id, checked) => {
    const { payForUsers } = this.state;
    let tempArr = payForUsers;
    if (!payForUsers.length) {
      this.setState({ payForUsers: [...payForUsers, id] });
    }
    if (payForUsers.length) {
      payForUsers.map((user, index) => {
        if (user !== id && checked) {
          this.setState({ payForUsers: [...payForUsers, id] });
        }
        if (user == id && checked) {
          return;
        }
        if (user == id && !checked) {
          tempArr.splice(index, 1);
          this.setState({ payForUsers: tempArr });
        }
      });
    }
  };
  handleBuy = () => {
    const { sellItem, user } = this.props;
    const { userEmail, payForUsers } = this.state;

    const sellBox = sellItem._id;
    const sellBoxName = sellItem.name;
    const period = sellItem.number * sellItem.period;
    const sum = sellItem.price;
    const email = userEmail;
    const status = 'new';
    const customer = user.user._id;

    if (!email) {
      alert('Укажите свой email адрес -это обязательно!');
    }
    if (!payForUsers.length) {
      alert('Вы должны выбрать того, для кого приобретаете данный курс.');
    }
    if (payForUsers.length) {
      payForUsers.map(user => {
        const initTime = Date.now();

        fetch('http://localhost:8888/order', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            initTime,
            status,
            period,
            sellBox,
            sellBoxName,
            customer,
            user,
            sum,
            email,
          }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Wrong credentials');
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
          });
      });
    }
  };

  handleEmailChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { sellItem, times, user } = this.props;
    const { children, userEmail, payForUsers } = this.state;

    const count = payForUsers.length;
    const sum = sellItem.price * count;
    let message = false;
    if (sum > 0) {
      message = true;
    }
    let childList;
    if (children.length) {
      childList = children.map(child => {
        return (
          <div key={child._id} className="order-child">
            <SquareCheckBox onCheck={this.handleCheck} checkBoxId={child._id} />
            <p>
              {child.firstName} {child.lastName}
            </p>
          </div>
        );
      });
    }
    //console.log(user);
    return (
      <div className="order-wrapper">
        <h3>Ваш заказ</h3>
        <p>
          Вы выбрали {sellItem.name} на {sellItem.number} {times} за{' '}
          {sellItem.price} рублей.
        </p>
        <span>выберите для которого вы преобритаете курс:</span>
        {childList}
        <InputEmail
          inputName={'email'}
          onInput={this.handleEmailChange}
          userEmail={userEmail}
        />
        <BtnClose onBtnClick={this.handleOrderClose} />
        {message && (
          <p>
            Вы заказали {sellItem.name} на сумму {sum} рублей.
          </p>
        )}
        <Btn btnName={'оплатить курс'} onBtnClick={this.handleBuy} />
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
