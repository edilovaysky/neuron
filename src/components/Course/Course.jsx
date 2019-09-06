import './Course.scss';
import React, { Component } from 'react';

import { EditingCourse } from 'components/EditingCourse';
import { Subject } from 'components/Subject';

export class Course extends Component {
  state = {
    display: false,
    edit: false,
  };

  handleDisplay = () => {
    this.setState({ display: !this.state.display });
  };

  handleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };
  render() {
    const { studyYear } = this.props;
    const { display, edit } = this.state;

    return (
      <>
        <div className="card-wraper">
          <div className="card-header">
            <p onClick={this.handleDisplay}>{studyYear}-й класс</p>
          </div>
          {display && (
            <div className="card-body">
              <Subject subjectsId={this.props.subject} />
            </div>
          )}
        </div>
      </>
    );
  }
}
