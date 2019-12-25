import './AdminSellBoxesLayout.scss';

import React, { Component } from 'react';
import { SellPlate } from 'components/SellPlate';
import { Course } from 'components/Course';
import { InputText } from 'components/InputText';
import { Btn } from 'components/Btn';
import { SquareCheckBox } from 'components/SquareCheckBox';

export class AdminSellBoxesLayout extends Component {
  state = {
    display: false,
    dispDel: false,
    name: '',
    price: 0,
    number: 0,
    period: 0,
    courses: [],
    displaySellPlate: false,
    approve: false,
    chosenCourse: '',
    chosenBox: '',
    sellBoxes: [],
    chosenBox: '',
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

  handleApproveDel = id => {
    this.setState({ approveDel: !this.state.approveDel });
    const approve = !this.state.approveDel;
    if (approve === false) {
      this.setState({ chosenBox: '' });
    }
    if (approve === true) {
      this.setState({ chosenBox: id });
    }
  };

  handleCreate = () => {
    const { name, price, number, chosenCourse, period } = this.state;

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

    const courses = chosenCourse;

    fetch('http://localhost:8888/new-sell-box', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        period,
        price,
        number,
        courses,
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
        this.setState({ displaySellPlate: true });
      });
  };

  handleDelete = () => {
    const { chosenBox } = this.state;
    const id = chosenBox;
    if (!id) {
      alert('Выберите sellBox который необходимо удалить.');
    }
    if (id) {
      fetch(`http://localhost:8888/sellbox-delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          console.log('succesful sellBox deleting');

          return response.json();
        })
        .then(data => {
          alert(`Вы удалили ${data.sellboxes.name}`);
        });
    }
  };

  handleDispDel = () => {
    this.setState({ dispDel: !this.state.dispDel });
  };
  handleNameChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const {
      display,
      dispDel,
      name,
      number,
      price,
      courses,
      displaySellPlate,
      sellBoxes,
      chosenBox,
    } = this.state;
    console.log(chosenBox);
    const courseList = courses.map(i => {
      return (
        <div className="sell-box-course-block-wrapper" key={i._id}>
          <input type="checkbox" id={i._id} onClick={this.handleApproveYes} />
          <label className="approve-check-lable" htmlFor={i._id}>
            <span>выбрать</span>
          </label>
          <Course studyYear={i.studyYear} subject={i.subject} />
        </div>
      );
    });

    let sellBoxesList;
    if (sellBoxes) {
      sellBoxesList = sellBoxes.map(box => {
        return (
          <div className="sell-box-list-block-wrapper" key={box._id}>
            <SquareCheckBox
              onCheck={this.handleApproveDel}
              checkBoxId={box._id}
              checkBoxMsg={''}
            />
            <li>{box.name}</li>
          </div>
        );
      });
    }

    return (
      <div className="sell-box-wrapper">
        <p className="sell-box-h" onClick={this.handleDisp}>
          создать sellBox
        </p>
        {display && (
          <>
            <div className="sell-box-block-wrapper">
              <span className="sell-box-s">напишите имя sellBox'а</span>
              <InputText inputName={'name'} onDone={this.handleNameChange} />
            </div>

            <div className="sell-box-block-wrapper">
              <span>укажите количество:</span>
              <input
                type="number"
                min="1"
                step="1"
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
            <div className="sell-box-block-wrapper">
              <span>укажите цену за выбраный период</span>
              <input
                type="number"
                min="0"
                max="15000"
                name="price"
                step="100"
                placeholder="0"
                value={price || ''}
                onChange={this.handleTextChange}
              />
            </div>

            <div className="sell-box-block-wrapper">
              <span onClick={this.handleFetchCourse}>
                список доступных курсов:
              </span>
              {courseList}
            </div>
            <Btn btnName={'создать'} onBtnClick={this.handleCreate} />
          </>
        )}
        {displaySellPlate && <SellPlate sellBoxes={sellBoxes} />}
        <p className="sell-box-h" onClick={this.handleDispDel}>
          удалить sellBox
        </p>
        {dispDel && (
          <>
            <div className="sell-box-block-wrapper">
              <span className="sell-box-s">список sellBox'ов:</span>
              <ul>{sellBoxesList}</ul>
            </div>
            <Btn btnName={'удалить'} onBtnClick={this.handleDelete} />
          </>
        )}
      </div>
    );
  }
}
