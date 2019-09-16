import './Registration.scss';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

export class AddTheme extends Component {
  state = {
    themes: [],
    theme: '',
    themesToEdit: [],
    themeToEdit: '',
    themeToDel: '',
    lessons: [],
    lesson: '',
  };

  handleAddTheme = () => {
    let { theme } = this.state;
    theme.toLowerCase();

    fetch(`http://localhost:8888/reg-theme`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        theme,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json();
      })
      .then(data => {
        console.log('theme was added');
        alert('Тема добавлена');
      });
  };

  handleDelTheme = () => {
    let { themeToDel } = this.state;
    const id = themeToDel;
    console.log(id);
    let marker = false;
    if (id) {
      marker = true;
    }

    fetch(`http://localhost:8888/themes/delete/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        marker,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json();
      })
      .then(data => {
        console.log('theme was deleted');
        alert('Тема удалена');
      });
  };

  fetchTheme = (a, b) => {
    fetch(`http://localhost:8888/theme`, {
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
        if (a) {
          this.setState({ themes: data });
        }
        if (b) {
          this.setState({ themesToEdit: data });
        }
      });
  };

  fetchLessons = () => {
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

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleAddLesson = () => {
    const { themeToEdit, lesson } = this.state;
    let id = themeToEdit;
    fetch(`http://localhost:8888/themes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lesson,
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

        console.log('succesful editing');
        alert('урок добавлен к теме');
      });
  };

  handleDelLesson = () => {
    const { themeToEdit, lesson } = this.state;
    let id = themeToEdit;
    fetch(`http://localhost:8888/themes/delete/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lesson,
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

        console.log('succesful editing');
        alert('урок удален из темы');
      });
  };

  handleThemeA = () => {
    const a = true;
    const b = false;
    this.fetchTheme(a, b);
  };
  handleThemeB = () => {
    const a = false;
    const b = true;
    this.fetchTheme(a, b);
  };

  render() {
    const { themes, theme, themesToEdit, lessons, lesson } = this.state;

    let themeToAdd;
    let themeToEdit;
    let lessonToAdd;
    if (themes.theme) {
      themeToAdd = themes.theme.map((i, index) => {
        return (
          <li key={index} value={i._id}>
            {i.theme}
          </li>
        );
      });
    }

    if (themesToEdit.theme) {
      themeToEdit = themesToEdit.theme.map((i, index) => {
        return (
          <option key={index} value={i._id}>
            {i.theme}
          </option>
        );
      });
    }

    if (lessons.lesson) {
      lessonToAdd = lessons.lesson.map((i, index) => {
        return (
          <option key={index} value={i._id}>
            {i.lesson} {i.toTheme}
          </option>
        );
      });
    }

    return (
      <>
        <div className="reg-wrap">
          <div className="reg">
            <h3>Добавление тем</h3>
            <span onClick={this.handleThemeA} className="click-span">
              список зарегестрированных тем
            </span>
            <ol>{themeToAdd}</ol>
            <span>напишите название темы</span>
            <input
              required
              onChange={this.handleTextChange}
              name="theme"
              type="text"
              value={theme || ''}
              placeholder="название темы"
            />
            <br />
            <button onClick={this.handleAddTheme}>добавить тему</button>
          </div>
        </div>
        <div className="reg-wrap">
          <div className="reg">
            <h3>Удаление тем</h3>
            <span onClick={this.handleThemeB} className="click-span">
              список зарегестрированных тем:
            </span>
            <select name="themeToDel" onChange={this.handleTextChange}>
              <option defaultValue>выберите удаляемую тему</option>
              {themeToEdit}
            </select>
            <button onClick={this.handleDelTheme}>удалить тему</button>
          </div>
        </div>
        <div className="reg-wrap">
          <div className="reg">
            <h3>Редактирование тем</h3>
            <span onClick={this.handleThemeB} className="click-span">
              список зарегестрированных тем:
            </span>
            <select name="themeToEdit" onChange={this.handleTextChange}>
              <option defaultValue>выберите редактируемую тему</option>
              {themeToEdit}
            </select>
            <span onClick={this.fetchLessons} className="click-span">
              список зарегестрированных уроков:
            </span>
            <select name="lesson" onChange={this.handleTextChange}>
              <option defaultValue>выберите урок</option>
              {lessonToAdd}
            </select>
            <div className="button-block">
              <button onClick={this.handleAddLesson}>добавить урок</button>
              <button onClick={this.handleDelLesson}>удалить урок</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
