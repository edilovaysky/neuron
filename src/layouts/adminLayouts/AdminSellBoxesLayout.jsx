import React, { Component } from 'react';
import { SellPlate } from 'components/SellPlate';
import { Course } from 'components/Course';

export class AdminSellBoxesLayout extends Component {
  state = {
    display: false,
    name: '',
    price: 0,
    number: 0,
    period: 0,
    courses: [],
    displaySellPlate: false,
    approve: false,
    chosenCourse: '',
  };
  handleDisp = () => {
    this.setState({ display: !this.state.display });
  };

  handleTextChange = ({ target: { name, value } }) => {
    let newValue;
    if (name == 'number') {
      newValue = parseInt(value);
    }
    if (name == 'period' && value == 'day') {
      newValue = 24 * 60 * 60 * 1000;
    }
    if (name == 'period' && value == 'month') {
      newValue = 30.5 * 24 * 60 * 60 * 1000;
    }
    if (name == 'period' && value == 'year') {
      newValue = 365 * 24 * 60 * 60 * 1000;
    }
    if (name == 'name') {
      newValue = value;
    }
    if (name == 'price') {
      newValue = parseInt(value);
    }
    this.setState({
      [name]: newValue,
    });
  };
  handleFetchCourse = () => {
    fetch(`http://localhost:8888/courses`, {
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
        const { course } = data;
        this.setState({
          courses: course,
        });
      });
  };
  handleApproveYes = ({ target: { id } }) => {
    this.setState({ approve: !this.state.approve });
    const approve = !this.state.approve;
    if (approve === false) {
      this.setState({ chosenCourse: '' });
    }
    if (approve === true) {
      this.setState({ chosenCourse: id });
    }
  };

  handleCreate = () => {
    const { name, price, number, period, chosenCourse } = this.state;
    if (!name) {
      alert('Вы должны написать название для sellBox');
      return;
    }
    if (number == 0) {
      alert('Вы должны указать колличество.');
      return;
    }
    if (period == 0) {
      alert('Вы должны указать период действия.');
      return;
    }
    if (price == 0) {
      alert('Вы должны указать цену.');
      return;
    }
    if (!chosenCourse) {
      alert('Вы должны выбрать курс.');
      return;
    }

    fetch('http://localhost:8888/new-sell-box', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        number,
        period,
        price,
        chosenCourse,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        console.log('succesful sellBox creating');
        alert('Вы создали новый sellBox');
        return response.json();
      })
      .then(data => {
        console.log(data);
      });
  };

  render() {
    const {
      display,
      name,
      number,
      price,
      courses,
      displaySellPlate,
      approve,
      chosenCourse,
    } = this.state;
    console.log(chosenCourse);
    const courseList = courses.map(i => {
      return (
        <div className="sell-box-course-wrapper" key={i._id}>
          <input type="checkbox" id={i._id} onClick={this.handleApproveYes} />
          <label className="approve-check-lable" htmlFor={i._id}>
            <span>выбрать</span>
          </label>
          <Course studyYear={i.studyYear} subject={i.subject} />
        </div>
      );
    });

    return (
      <div>
        <p onClick={this.handleDisp}>создать sellBox</p>
        {display && (
          <>
            <span>напишите имя sellBox'а</span>
            <input
              type="text"
              name="name"
              value={name || ''}
              onChange={this.handleTextChange}
            />
            <div className="period-wrapper">
              <span>укажите количество:</span>
              <input
                type="number"
                name="number"
                value={number || ''}
                onChange={this.handleTextChange}
              />
              <span>укажите период действия:</span>
              <select name="period" onChange={this.handleTextChange}>
                <option defaultValue>выбрать:</option>
                <option value="day">день</option>
                <option value="month">месяц</option>
                <option value="year">год</option>
              </select>
            </div>
            <span>укажите цену за выбраный период</span>
            <input
              type="number"
              min="1000"
              max="15000"
              name="price"
              step="100"
              placeholder="1000"
              value={price || ''}
              onChange={this.handleTextChange}
            />
            <div className="course-to-add">
              <span onClick={this.handleFetchCourse}>
                список доступных курсов:
              </span>
              {courseList}
              {displaySellPlate && <SellPlate courses={courses} />}
            </div>
            <button onClick={this.handleCreate}>создать</button>
          </>
        )}
      </div>
    );
  }
}
