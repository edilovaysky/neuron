import './Subject.scss';
import React, { Component } from 'react';

import { Theme } from 'components/Theme';

export class Subject extends Component {
  state = {
    displaySub: false,
    subjects: [],
    themes: [],
  };
  fetchSubject = () => {
    this.setState({
      displaySub: !this.state.displaySub,
      subjects: [],
    });

    const { subjectsId } = this.props;
    subjectsId.map(i => {
      const id = i;
      fetch(`http://localhost:8888/subject/${id}`, {
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
          this.setState({
            subjects: [...this.state.subjects, data],
          });
        });
    });
  };
  render() {
    const { displaySub, subjects } = this.state;
    let subject;
    if (subjects) {
      subject = subjects.map((i, index) => {
        return (
          <li key={index}>
            {i.subject.subject}
            <Theme themeIds={i.subject.themes} />
          </li>
        );
      });
    }

    return (
      <>
        <div className="card-body">
          <p onClick={this.fetchSubject}>предметы</p>
          {displaySub && <ul>{subject}</ul>}
        </div>
      </>
    );
  }
}
