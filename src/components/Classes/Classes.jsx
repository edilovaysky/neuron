import './Classes.scss';
import React, { Component } from 'react';
import { StudyClass } from 'components/StudyClass';

export class Classes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      foundClasses: [],
      display: false,
    };
  }
  handleDisplay = () => {
    this.setState({ display: !this.state.display });
  };

  handleCleanFoundUser = () => {
    this.setState({ foundClasses: [] });
  };

  handleFind = () => {
    let { name } = this.state;
    //const status = this.props.users[0].props.status;
    console.log(name);
    name = name.replace(/\s/g, '');
    if (!name == '') {
      fetch(`http://localhost:8888/find-class?name=${name}`, {
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
          this.setState({ foundClasses: data.studyClasses });
        });
    }
  };
  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { lastName, foundClasses, display } = this.state;
    const foundArr = foundClasses.map(found => {
      return <StudyClass key={found._id} {...found} />;
    });
    const studyClass = this.props.classes.studyClasses.map(studyClass => {
      return <StudyClass key={studyClass._id} {...studyClass} />;
    });
    return (
      <div className="classes-wrap">
        <input
          required
          onChange={this.handleTextChange}
          name="name"
          type="text"
          value={lastName}
          placeholder="название класса"
        />
        <button onClick={this.handleFind}>найти</button>
        <button onClick={this.handleCleanFoundUser}>очистить</button>
        {foundArr}
        <h3 onClick={this.handleDisplay}>Классы</h3>
        {display && <>{studyClass}</>}
      </div>
    );
  }
}
