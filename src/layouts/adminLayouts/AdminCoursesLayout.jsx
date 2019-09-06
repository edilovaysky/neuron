import './AdminUsersLayout.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CourseReg } from 'components/Registration/CourseReg';
import { AddTheme } from 'components/Registration/AddTheme';
import { AddLesson } from 'components/Registration/AddLesson';
import { AddSubject } from 'components/Registration/AddSubject';
import { Courses } from 'components/Courses';
import { AdminInstruction } from '../texts/AdminInstruction';

import { loadUsers } from 'actions/fetchUsers';
import { loadClasses } from 'actions/fetchClasses';
import { loadCourses } from 'actions/fetchCourses';

class AdminCourseLayouts extends Component {
  state = {
    instructions: '',
    allCourses: '',
    reg: '',
    addtheme: '',
    addlesson: '',
    addsubject: '',
  };

  handleMenu = event => {
    const value = event.target.id;
    if (value == 'instructions') {
      this.setState({
        instructions: 'active',
        allCourses: '',
        reg: '',
        addlesson: '',
        addsubject: '',
        addtheme: '',
      });
    }
    if (value == 'allcourses') {
      this.setState({
        instructions: '',
        allCourses: 'active',
        reg: '',
        addlesson: '',
        addsubject: '',
        addtheme: '',
      });
    }
    if (value == 'reg') {
      this.setState({
        instructions: '',
        allCourses: '',
        reg: 'active',
        addlesson: '',
        addsubject: '',
        addtheme: '',
      });
    }
    if (value == 'addtheme') {
      this.setState({
        instructions: '',
        allCourses: '',
        reg: '',
        addtheme: 'active',
        addlesson: '',
        addsubject: '',
      });
    }
    if (value == 'addlesson') {
      this.setState({
        instructions: '',
        allCourses: '',
        reg: '',
        addtheme: '',
        addlesson: 'active',
        addsubject: '',
      });
    }
    if (value == 'addsubject') {
      this.setState({
        instructions: '',
        allCourses: '',
        reg: '',
        addtheme: '',
        addlesson: '',
        addsubject: 'active',
      });
    }

    setTimeout(() => {
      this.handleFetchStatus();
      if (this.state.allCourses == 'active') {
        const { handleFetchCourses } = this.props;
        handleFetchCourses();
      }
    }, 0);

    event.preventDefault();
  };

  handleFetchStatus = () => {
    const { fetchStatus } = this.state;
    const { handleFetchUsers } = this.props;
    handleFetchUsers(fetchStatus);
  };
  render() {
    const {
      fetchStatus,
      instructions,
      allCourses,
      reg,
      addtheme,
      addlesson,
      addsubject,
    } = this.state;

    const courses = this.props.courses;
    const { user } = this.props;
    let status;
    if (user.user) {
      status = user.user.status;
    }
    console.log();
    return (
      <>
        <p>Страница управления курсами</p>
        <ul className="layout-menu">
          <li
            id="instructions"
            className={`${instructions}`}
            onClick={this.handleMenu}
          >
            инструкции
          </li>

          <li
            id="allcourses"
            className={`${allCourses}`}
            onClick={this.handleMenu}
          >
            все курсы
          </li>
          {status == 'esquire' && (
            <>
              <li id="reg" className={`${reg}`} onClick={this.handleMenu}>
                добавление курсов
              </li>
              <li
                id="addsubject"
                className={`${addsubject}`}
                onClick={this.handleMenu}
              >
                добавление предметов
              </li>
              <li
                id="addtheme"
                className={`${addtheme}`}
                onClick={this.handleMenu}
              >
                добавление тем
              </li>
              <li
                id="addlesson"
                className={`${addlesson}`}
                onClick={this.handleMenu}
              >
                добавление уроков
              </li>
            </>
          )}
        </ul>
        <div className="layout-wraper">
          {instructions == 'active' && <AdminInstruction />}
          {allCourses == 'active' && <Courses courses={courses} />}
          {reg == 'active' && <CourseReg />}
          {addtheme == 'active' && <AddTheme />}
          {addlesson == 'active' && <AddLesson />}
          {addsubject == 'active' && <AddSubject />}
        </div>
      </>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.userAuth.entries,
    users: state.fetchUsers.entries.users,
    classes: state.fetchClasses.entries,
    courses: state.fetchCourses.entries,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    handleFetchUsers: fetchStatus => dispatch(loadUsers(fetchStatus)),
    handleFetchClasses: () => dispatch(loadClasses()),
    handleFetchCourses: () => dispatch(loadCourses()),
  };
}

export const AdminCoursesLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCourseLayouts);
