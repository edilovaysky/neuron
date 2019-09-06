import './Registration.scss';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

export class AddLesson extends Component {
  state = {
    lesson: '',
    toTheme: '',
    path: '',
    lessons: [],
  };

  handleAddLesson = () => {
    let { lesson, toTheme, path } = this.state;

    path.toLowerCase();
    lesson.toLowerCase();
    toTheme.toLowerCase();

    fetch(`http://localhost:8888/reg-lesson`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lesson,
        toTheme,
        path,
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
        console.log('Lesson was added');
        alert('Урок добавлен');
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

  render() {
    const { lessons, lesson, path, toTheme } = this.state;
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

    return (
      <>
        <div className="reg-wrap">
          <div className="reg">
            <h3>Добавление уроков</h3>
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
            <span>напишите путь к уроку</span>
            <input
              required
              onChange={this.handleTextChange}
              name="path"
              type="text"
              value={path || ''}
              placeholder="путь к расположению урока"
            />
            <br />
            <button onClick={this.handleAddLesson}>добавить урок</button>
          </div>
        </div>
      </>
    );
  }
}