import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Logo } from 'components/Logo';
import { Note } from 'components/Note';
import { OrderToPay } from 'components/OrderToPay';

export class UserSideBarInit extends Component {
  state = {
    classRoom: '',
    courses: '',
    tutor: '',
    userProfile: '',
    sellPage: '',
    notes: '',
    orders: [],
  };
  componentDidMount = () => {
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
            if (data !== null) {
              this.setState({ orders: [...this.state.orders, data] });
            }
          });
      });
    }
  };

  handleEnter = event => {
    const { onEnter } = this.props;
    const value = event.target.id;
    const displayOrderToPay = true;
    onEnter(value, displayOrderToPay);
    if (value == 'classRoom') {
      this.setState({
        classRoom: 'active',
        courses: '',
        tutor: '',
        userProfile: '',
        sellPage: '',
        notes: '',
      });
    }
    if (value == 'courses') {
      this.setState({
        courses: 'active',
        classRoom: '',
        tutor: '',
        userProfile: '',
        sellPage: '',
        notes: '',
      });
    }
    if (value == 'tutor') {
      this.setState({
        tutor: 'active',
        classRoom: '',
        courses: '',
        userProfile: '',
        sellPage: '',
        notes: '',
      });
    }
    if (value == 'user-profile') {
      this.setState({
        tutor: '',
        classRoom: '',
        courses: '',
        userProfile: 'active',
        sellPage: '',
        notes: '',
      });
    }
    if (value == 'sellPage') {
      this.setState({
        tutor: '',
        classRoom: '',
        courses: '',
        userProfile: '',
        sellPage: 'active',
        notes: '',
      });
    }
    if (value == 'notes') {
      this.setState({
        tutor: '',
        classRoom: '',
        courses: '',
        userProfile: '',
        sellPage: '',
        notes: 'active',
      });
    }

    event.preventDefault();
  };

  render() {
    const {
      classRoom,
      courses,
      tutor,
      userProfile,
      sellPage,
      orders,
      notes,
    } = this.state;

    let msg = 0;

    if (orders.length > 0) {
      orders.map(order => {
        if (order.status == 'new') {
          msg++;
        }
      });
    }

    const { status } = this.props;
    return (
      <>
        <div className="side-nav-bar">
          <ul>
            <Logo />
            {orders.length > 0 && (
              <li
                id="notes"
                className={`side-btn-${notes}`}
                onClick={this.handleEnter}
              >
                <>оплатить {msg}</>
              </li>
            )}
            <li
              id="user-profile"
              className={`side-btn-${userProfile}`}
              onClick={this.handleEnter}
            >
              {status == 'user' ? <>профиль</> : <>мой профиль</>}
            </li>
            <li
              id="sellPage"
              className={`side-btn-${sellPage}`}
              onClick={this.handleEnter}
            >
              <>выбрать курсы</>
            </li>
            <li
              id="classRoom"
              className={`side-btn-${classRoom}`}
              onClick={this.handleEnter}
            >
              {status == 'user' ? <>класс</> : <>мой класс</>}
            </li>
            <li
              id="courses"
              className={`side-btn-${courses}`}
              onClick={this.handleEnter}
            >
              {status == 'user' ? <>курсы</> : <>мои курсы</>}
            </li>
            <li
              id="tutor"
              className={`side-btn-${tutor}`}
              onClick={this.handleEnter}
            >
              {status == 'user' ? <>тьютор</> : <>мой тьютор</>}
            </li>
          </ul>
        </div>
      </>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    user: state.userAuth.entries,
  };
}

export const UserSideBar = connect(mapStateToProps)(UserSideBarInit);
