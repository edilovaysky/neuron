import './EditingCourse.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { loadUsers } from 'actions/fetchUsers';
import { loadCourses } from 'actions/fetchCourses';

export class EditingCourses extends Component {
  constructor(props) {
    super(props);
    const { courseToEdit } = this.props;
    this.state = {
      display: false,
      theme: courseToEdit.theme,
      number: courseToEdit.number,
      path: courseToEdit.path,
      task: courseToEdit.task,
      optTheme: '',
    };
  }
  handleDisplay = () => {
    this.setState({
      display: !this.state.display,
    });
  };
  componentDidMount() {
    let fetchStatus = 'teacher';
    const { handleFetchUsers } = this.props;
    handleFetchUsers(fetchStatus);
  }

  handleEdit = () => {
    const { courseToEdit } = this.props;
    const id = courseToEdit._id;
    let { theme, number, path, task, optTheme } = this.state;
    if (!optTheme == '') {
      return (theme = null);
    }
    //console.log(theme + '  ' + id);
    fetch(`http://localhost:8888/course/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        theme,
        number,
        path,
        task,
        optTheme,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        console.log('succesful editing');
        alert('курс успешно отредактирован.');
        return response.json();
      })
      .then(data => {
        console.log(data);
      });
  };

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { display, number, theme, path, task } = this.state;
    const { courseToEdit } = this.props;
    console.log(courseToEdit.themes[0].theme);

    const optTheme = courseToEdit.themes.map((i, index) => {
      return (
        <option key={index} value={i.theme}>
          {i.theme}
        </option>
      );
    });

    return (
      <>
        <div className="editing-wrap">
          <div className="editing">
            <h3>редактирование данных</h3>
            <i>заполните подлежащие редактированию поля</i>
            <span onClick={this.handleDisplay}>Добавить тему</span>
            {display && (
              <input
                required
                onChange={this.handleTextChange}
                name="theme"
                type="text"
                value={theme || ''}
                placeholder={theme}
              />
            )}
            <br />
            <span>редактировать тему</span>
            <select name="optTheme">
              <option defaultValue>редактируемая тема</option>
              {optTheme}
            </select>
            <span>номер урока</span>
            <input
              required
              onChange={this.handleTextChange}
              name="number"
              type="text"
              value={number || ''}
              placeholder={number}
            />
            <br />
            <span>путь к файлу с уроком: </span>
            <input
              required
              onChange={this.handleTextChange}
              name="path"
              type="text"
              value={path || ''}
              placeholder={path}
            />
            <br />
            <span>путь к файлу с заданием на дом: </span>
            <input
              required
              onChange={this.handleTextChange}
              name="task"
              type="text"
              value={task || ''}
              placeholder={task}
            />
            <br />
            <p className="editing-btn" onClick={this.handleEdit}>
              отредактировать
            </p>
          </div>
        </div>
      </>
    );
  }
}

EditingCourses.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  studyGroup: PropTypes.string,
  teacherName: PropTypes.string,
  teacherLastName: PropTypes.string,
  teacherPassword: PropTypes.string,
};
function mapStateToProps(state, props) {
  return {
    //user: state.userAuth.entries,
    //users: state.fetchUsers.entries.users,
    // classes: state.fetchClasses.entries,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    handleFetchUsers: fetchStatus => dispatch(loadUsers(fetchStatus)),
    handleFetchClasses: () => dispatch(loadClasses()),
  };
}

export const EditingCourse = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditingCourses);
