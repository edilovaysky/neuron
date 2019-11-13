import './Lesson.scss';
import React, { Component } from 'react';

export class Lesson extends Component {
  state = {
    displayLesson: false,
    lessons: [],
  };
  fetchLesson = () => {
    this.setState({
      displayLesson: !this.state.displayLesson,
      lessons: [],
    });

    const { lessonIds } = this.props;
    lessonIds.map(i => {
      const id = i;

      fetch(`http://localhost:8888/lesson/${id}`, {
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
          console.log(data);
          this.setState({
            lessons: [...this.state.lessons, data],
          });
        });
    });
  };
  render() {
    const { displayLesson, lessons } = this.state;

    let lesson;
    if (lessons) {
      lessons.sort((a, b) => {
        a.lesson.lesson > b.lesson.lesson;
      });

      lesson = lessons.map((i, index) => {
        return (
          <li key={index} className="lesson-list-item">
            {i.lesson.lesson}
          </li>
        );
      });
    }

    return (
      <>
        <p className="inlist" onClick={this.fetchLesson}>
          уроки
        </p>
        {displayLesson && <ul className="lesson-list">{lesson}</ul>}
      </>
    );
  }
}
