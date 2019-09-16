import './Registration.scss';

import React, { Component } from 'react';

//import PropTypes from 'prop-types';

export class AddSubject extends Component {
  state = {
    subjects: [],
    subjectsToEdit: [],
    subject: '',
    subjectToEdit: '',
    subjectToDel: '',
    themes: [],
    theme: '',
    course: '',
  };

  handleAddSub = () => {
    let { subject } = this.state;
    subject.toLowerCase();
    if (subject !== '') {
      fetch(`http://localhost:8888/reg-subject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          return response.json();
        })
        .then(data => {
          //console.log(data);
          console.log('Subject was added');
          alert('Предмет добавлен');
        });
    }
  };

  handleDelSub = () => {
    let { subjectToDel } = this.state;
    const id = subjectToDel;
    let delMarker = false;
    if (id) {
      delMarker = true;
    }
    console.log('id  ' + id);
    console.log('marker  ' + delMarker);
    fetch(`http://localhost:8888/subjects/delete/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        delMarker,
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
        console.log('Subject was deleted');
        alert('Предмет удален');
      });
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
    console.log(value);
  };

  fetchSubject = (a, b) => {
    fetch(`http://localhost:8888/subject`, {
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
          this.setState({ subjects: data });
        }
        if (b) {
          this.setState({ subjectsToEdit: data });
        }
      });
  };
  fetchTheme = () => {
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
        this.setState({ themes: data });
      });
  };
  handleSubjectA = () => {
    const a = true;
    const b = false;
    this.fetchSubject(a, b);
  };
  handleSubjectB = () => {
    const a = false;
    const b = true;
    this.fetchSubject(a, b);
  };

  handleAddTheme = () => {
    const { subjectToEdit, theme } = this.state;
    let id = subjectToEdit;
    fetch(`http://localhost:8888/subjects/${id}`, {
      method: 'PUT',
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
        console.log(data);

        console.log('succesful editing');
        alert('тема добавлена к предмету');
      });
  };

  handleDelTheme = () => {
    const { subjectToEdit, theme } = this.state;
    let id = subjectToEdit;
    fetch(`http://localhost:8888/subjects/delete/${id}`, {
      method: 'PUT',
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
        console.log(data);

        console.log('succesful editing');
        alert('тема удалена из предмета');
      });
  };

  render() {
    const { subject, subjects, themes, subjectsToEdit } = this.state;

    let subList;
    if (subjects.subject) {
      subList = subjects.subject.map((i, index) => {
        return <li key={index}>{i.subject}</li>;
      });
    }
    let subToEdit;
    if (subjectsToEdit.subject) {
      subToEdit = subjectsToEdit.subject.map((i, index) => {
        return (
          <option key={index} value={i._id}>
            {i.subject}
          </option>
        );
      });
    }
    let themeList;
    if (themes.theme) {
      themeList = themes.theme.map((i, index) => {
        return (
          <option key={index} value={i._id}>
            {i.theme}
          </option>
        );
      });
    }

    return (
      <>
        <div className="reg-wrap">
          <div className="reg">
            <h3>Добавление предметов</h3>
            <span onClick={this.handleSubjectA} className="click-span">
              список зарегестрированных предметов
            </span>
            <ol>{subList}</ol>
            <span>напишите название предмета</span>
            <input
              required
              onChange={this.handleTextChange}
              name="subject"
              type="text"
              value={subject || ''}
              placeholder="название предмета"
            />
            <br />

            <button onClick={this.handleAddSub}>добавить предмет</button>
          </div>
        </div>
        <div className="reg-wrap">
          <div className="reg">
            <h3>Удаление предметов</h3>
            <span onClick={this.handleSubjectB} className="click-span">
              список зарегестрированных предметов:
            </span>
            <select name="subjectToDel" onChange={this.handleTextChange}>
              <option defaultValue>выберите удаляемый предмет</option>
              {subToEdit}
            </select>

            <button onClick={this.handleDelSub}>удалить предмет</button>
          </div>
        </div>
        <div className="reg-wrap">
          <div className="reg">
            <h3>Редактирование предметов</h3>
            <span onClick={this.handleSubjectB} className="click-span">
              список зарегестрированных предметов:
            </span>
            <select name="subjectToEdit" onChange={this.handleTextChange}>
              <option defaultValue>выберите редактируемый предмет</option>
              {subToEdit}
            </select>
            <span onClick={this.fetchTheme} className="click-span">
              список зарегестрированных тем:
            </span>
            <select name="theme" onChange={this.handleTextChange}>
              <option defaultValue>выберите тему</option>
              {themeList}
            </select>
            <div className="button-block">
              <button onClick={this.handleAddTheme}>добавить тему</button>
              <button onClick={this.handleDelTheme}>удалить тему</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
