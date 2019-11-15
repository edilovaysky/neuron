import './Courses.scss';
import React, { Component } from 'react';
import { Course } from 'components/Course';

export class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studyYear: '',
      subject: '',
      foundCourses: [],
      display: false,
    };
  }
  handleDisplay = () => {
    this.setState({ display: !this.state.display });
  };

  handleCleanFoundCourses = () => {
    this.setState({ foundCourses: [] });
  };

  handleFind = () => {
    let { subject } = this.state;
    subject = subject.replace(/\s/g, '');
    if (!subject == '') {
      fetch(`http://localhost:8888/find-course?subject=${subject}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          console.log(`${status}/s were found`);
          return response.json(response);
        })
        .then(data => {
          this.setState({ foundCourses: data.courses });
        });
    }
  };
  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { display } = this.state;
    const { courses } = this.props;
    console.log(courses);
    let course;
    if (courses.course) {
      course = courses.course.map(course => {
        return <Course key={course._id} {...course} />;
      });
    }

    return (
      <div className="classes-wrap">
        <h3 onClick={this.handleDisplay}>Курсы</h3>
        {display && <>{course}</>}
      </div>
    );
  }
}
