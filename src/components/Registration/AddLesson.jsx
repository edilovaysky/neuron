import './Registration.scss';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';
import { DragAndDrop } from '../DragAndDrop/DragAndDrop';

export class AddLesson extends Component {
  state = {
    lesson: '',
    lessonToDel: '',
    toTheme: '',
    lessons: [],
    displayAddLes: false,
    displayDelLes: false,
    formData: {},
  };

  handleDisplayAddLes = () => {
    this.setState({ displayAddLes: !this.state.displayAddLes });
  };

  handleDisplayDelLes = () => {
    this.setState({ displayDelLes: !this.state.displayDelLes });
  };

  handleAddLesson = () => {
    let { lesson, toTheme } = this.state;

    lesson.toLowerCase();
    toTheme.toLowerCase();

    const { formData } = this.state;
    formData.append('body', lesson);
    formData.append('body', toTheme);

    axios
      .put('http://localhost:8888/reg-lesson', formData)
      .then(response => {
        if (
          response.status == 200 &&
          response.data == 'Файл успешно добавлен'
        ) {
          alert(response.data);
          console.log('successful file upload');
        }
        if (response.data == 'Файл с этим именем уже существует') {
          alert(response.data);
          console.log('failed file upload');
        }
      })
      .catch(error => {
        console.log(error);
      });
    setTimeout(() => {
      alert('Урок создан, а файл будет загружен в хранилище в фоновом режиме');
      this.setState({ displayAddLes: !this.state.displayAddLes });
    }, 3000);
  };

  handleDelLesson = () => {
    let { lessonToDel } = this.state;
    const id = lessonToDel;

    fetch(`http://localhost:8888/lesson/delete/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
        console.log('Lesson was deleted');
        alert('Урок удален');
      });
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
    console.log(value);
  };

  fetchLesson = () => {
    fetch(`http://localhost:8888/lesson`, {
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ lessons: data });
      });
  };

  handleDragAndDrop = formData => {
    this.setState({ formData: formData });
  };

  render() {
    const {
      lessons,
      lesson,
      toTheme,
      displayAddLes,
      displayDelLes,
    } = this.state;
    const docType = 'lesson';

    let lessonList;
    if (lessons.lesson) {
      lessonList = lessons.lesson.map((i, index) => {
        return (
          <li key={index} value={i._id}>
            {i.lesson} {i.toTheme}
          </li>
        );
      });
    }
    let lessonListToDel;
    if (lessons.lesson) {
      lessonListToDel = lessons.lesson.map((i, index) => {
        return (
          <option key={index} value={i._id}>
            {' '}
            {i.lesson} {i.toTheme}
          </option>
        );
      });
    }

    return (
      <>
        <div className="reg-wrap">
          <div className="reg">
            <h3 className="click-span" onClick={this.handleDisplayAddLes}>
              Добавление уроков
            </h3>
            {displayAddLes && (
              <>
                <span className="click-span" onClick={this.fetchLesson}>
                  список зарегистрированных уроков
                </span>
                <ol>{lessonList}</ol>
                <span>напишите название урока</span>
                <input
                  required
                  onChange={this.handleTextChange}
                  name="lesson"
                  type="text"
                  value={lesson || ''}
                  placeholder="название урока"
                />
                <br />
                <span>напишите тему урока</span>
                <input
                  required
                  onChange={this.handleTextChange}
                  name="toTheme"
                  type="text"
                  value={toTheme || ''}
                  placeholder="тема урока"
                />
                <br />
                <span>видео файл</span>
                <DragAndDrop
                  docType={docType}
                  onSuccess={this.handleDragAndDrop}
                />
                <br />
                <button onClick={this.handleAddLesson}>добавить урок</button>
              </>
            )}
            <h3 className="click-span" onClick={this.handleDisplayDelLes}>
              Удаление уроков
            </h3>
            {displayDelLes && (
              <>
                <span className="click-span" onClick={this.fetchLesson}>
                  список зарегистрированных уроков
                </span>
                <select name="lessonToDel" onChange={this.handleTextChange}>
                  <option defaultValue>выберите урок для удаления</option>
                  {lessonListToDel}
                </select>

                <button onClick={this.handleDelLesson}>удалить урок</button>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}
