import './Registration.scss';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';
import { DragAndDrop } from '../DragAndDrop/DragAndDrop';
import { GetLesson } from '../GetLesson/GetLesson';

export class AddLesson extends Component {
  state = {
    lesson: '',
    lessonToDel: '',
    lessonToShow: '',
    toTheme: '',
    lessons: [],
    displayAddLes: false,
    displayDelLes: false,
    displayLesson: false,
    displayGetLesson: false,
    displayAddVideo: false,
    formData: {},
    url: '',
    videoToLesson: '',
  };

  handleDisplayAddLes = () => {
    this.setState({ displayAddLes: !this.state.displayAddLes });
  };

  handleDisplayGetLesson = () => {
    this.setState({ displayGetLesson: !this.state.displayGetLesson });
    const id = this.state.lessonToShow;
    fetch(`http://localhost:8888/lesson/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json(response);
      })
      .then(data => {
        const { url } = data;
        /* const bufferArr = data.data.Body.data;
        // Obtain a blob: URL for the video data.
        const arrayBufferView = new Uint8Array(bufferArr);
        const blob = new Blob([arrayBufferView], { type: 'video/mp4' });
        const urlCreator = window.URL || window.webkitURL;
        const videoUrl = urlCreator.createObjectURL(blob); */
        this.setState({ url: url });
      });
  };

  handleDisplayVideo = () => {
    this.setState({ displayAddVideo: !this.state.displayAddVideo });
  };

  handleDisplayDelLes = () => {
    this.setState({ displayDelLes: !this.state.displayDelLes });
  };

  handleAddLesson = () => {
    let { lesson, toTheme } = this.state;

    lesson.toLowerCase();
    toTheme.toLowerCase();
    const data = {
      lesson: lesson,
      toTheme: toTheme,
    };

    axios
      .put('http://localhost:8888/reg-lesson', data)
      .then(response => {
        if (response.status == 200) {
          alert('Урок успешно добавлен.');
          console.log('successful add lesson');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleAddVideo = () => {
    const { videoToLesson } = this.state;
    const lessonId = videoToLesson;

    const { formData } = this.state;
    formData.append('body', lessonId);

    axios
      .put('http://localhost:8888/video-to-lesson', formData)
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
        if ((respose.data = 'video was uploaded')) {
          alert('видео было успешно загружено');
        }
      })
      .catch(error => {
        console.log(error);
      });
    setTimeout(() => {
      alert('Урок создан, а файл будет загружен в хранилище в фоновом режиме');
      this.setState({ displayAddLes: !this.state.displayAddLes });
    }, 1000);
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

  handleDisplayLesson = () => {
    this.setState({ displayLesson: !this.state.displayLesson });
    this.fetchLesson();
  };

  handleGetLessonToVideo = () => {
    this.fetchLesson();
  };

  render() {
    const {
      lessons,
      lesson,
      toTheme,
      displayAddLes,
      displayDelLes,
      displayLesson,
      displayGetLesson,
      displayAddVideo,
      url,
    } = this.state;
    const docType = 'lesson';

    let lessonList;
    if (lessons.lesson) {
      lessonList = lessons.lesson.map(i => {
        return (
          <li key={i._id} value={i._id} onClick={this.handleDisplayLesson}>
            {i.lesson} {i.toTheme}
          </li>
        );
      });
    }
    let lessonListToDel;
    if (lessons.lesson) {
      lessonListToDel = lessons.lesson.map(i => {
        return (
          <option key={i._id} value={i._id}>
            {' '}
            {i.lesson} {i.toTheme}
          </option>
        );
      });
    }
    let lessonListToShow;
    if (lessons.lesson) {
      lessonListToShow = lessons.lesson.map(i => {
        return (
          <option key={i._id} value={i._id}>
            {' '}
            {i.lesson} {i.toTheme}
          </option>
        );
      });
    }
    let lessonToAddVideo;
    if (lessons.lesson) {
      lessonToAddVideo = lessons.lesson.map(i => {
        return (
          <option key={i._id} value={i._id}>
            {i.lesson} {i.toTheme}
          </option>
        );
      });
    }

    return (
      <>
        <div className="reg-wrap">
          <div className="reg">
            <h3 className="click-span" onClick={this.handleDisplayLesson}>
              Просмотр уроков
            </h3>
            {displayLesson && (
              <>
                <select name="lessonToShow" onChange={this.handleTextChange}>
                  <option defaultValue>выберите урок для просмотра</option>
                  {lessonListToShow}
                </select>
                <button onClick={this.handleDisplayGetLesson}>
                  показать урок
                </button>
                {displayGetLesson && <GetLesson url={url} />}
              </>
            )}
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
                <button onClick={this.handleAddLesson}>добавить урок</button>
              </>
            )}
            <h3 className="click-span" onClick={this.handleDisplayVideo}>
              Добавление видео к уроку
            </h3>
            {displayAddVideo && (
              <>
                <span
                  className="click-span"
                  onClick={this.handleGetLessonToVideo}
                >
                  выберите урок к которому хотите добавить видео
                </span>
                <select name="videoToLesson" onChange={this.handleTextChange}>
                  <option defaultValue>урок к которому добавляете видео</option>
                  {lessonToAddVideo}
                </select>
                <span>видео файл</span>
                <DragAndDrop
                  docType={docType}
                  onSuccess={this.handleDragAndDrop}
                />
                <button onClick={this.handleAddVideo}>добавить видео</button>
                <br />
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
