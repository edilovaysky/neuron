import './SellItem.scss';
import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { loadCourses } from 'actions/fetchCourses';
import { Course } from 'components/Course';
import { Order } from 'components/Order';

export class SellItem extends Component {
  state = {
    inboxCourses: this.props.sellItem.courses,
    courses: [],
    dispCourses: false,
    dispOrder: false,
    reverse: '',
  };
  handleShowCourse = () => {
    const { inboxCourses, dispCourses } = this.state;

    if (!dispCourses) {
      inboxCourses.map(id => {
        fetch(`http://localhost:8888/course/${id}`, {
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
            console.log(data);
            this.setState({
              courses: [...this.state.courses, data.course],
            });
          });
      });
    }
    if (dispCourses) {
      this.setState({ courses: [] });
    }
    this.setState({ dispCourses: !this.state.dispCourses });
  };
  handleMakeOrder = () => {
    this.setState({ dispOrder: true, reverse: '' });
  };
  handleOrderClose = () => {
    this.setState({ reverse: '-rev' });
    setTimeout(() => {
      this.setState({ dispOrder: false });
    }, 2000);
  };

  render() {
    const { dispCourses, courses, dispOrder, reverse } = this.state;
    const orderClass = `sell-item-box-order${reverse}`;

    const course = courses.map(data => {
      return <Course key={data._id} {...data} />;
    });

    const { sellItem } = this.props;
    const { period, number } = sellItem;
    let times;
    if (period == 86400000 && number == 1) {
      times = 'день';
    }
    if (period == 86400000 && number >= 2 && number <= 4) {
      times = 'дня';
    }
    if (period == 86400000 && number > 4) {
      times = 'дней';
    }
    if (period == 2635200000 && number == 1) {
      times = 'месяц';
    }
    if (period == 2635200000 && number >= 2 && number <= 4) {
      times = 'месяца';
    }
    if (period == 2635200000 && number > 4) {
      times = 'месяцев';
    }
    if (period == 31536000000 && number == 1) {
      times = 'год';
    }
    if (period == 31536000000 && number >= 2 && number <= 4) {
      times = 'года';
    }
    if (period == 31536000000 && number > 4) {
      times = 'лет';
    }

    return (
      <>
        <div className="sell-item-wrapper">
          <p> {sellItem.name}</p>
          <div className="sell-item-box">
            <p>
              стоимость на {number} {times} {sellItem.price} рублей.
            </p>
          </div>
          <div className="sell-item-box">
            <p onClick={this.handleShowCourse}>Что есть в этом курсе?</p>
            {dispCourses && <>{course}</>}
          </div>
          <div className="sell-item-box">
            <p onClick={this.handleMakeOrder}>Купить!</p>
          </div>
        </div>
        {dispOrder && (
          <div className={orderClass}>
            <Order sellItem={sellItem} onClose={this.handleOrderClose} />
          </div>
        )}
      </>
    );
  }
}
