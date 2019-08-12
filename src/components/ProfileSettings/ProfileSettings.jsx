import './ProfileSettings.scss';

import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { unAuth } from 'actions/auth';

export class ProfileSettings extends Component {
  componentWillMount() {
    this.setState({
      name: `${this.props.user.user.firstName}  ${
        this.props.user.user.lastName
      }`,
      status: this.props.user.user.status,
    });
  }
  componentDidMount() {}

  handleSignOut = event => {
    console.log(this.props);
    const { userUnauth } = this.props;
    userUnauth(this.state.token);
    event.preventDefault();
    /*  setTimeout(() => {
      return this.props.history.replace('/auth');
    }, 2000); */
  };
  render() {
    const { name, status } = this.state;
    const mapping = {
      admin: 'Администратор',
      teacher: 'Учитель',
      pupil: 'Ученик',
    };
    return (
      <div className="profile-user-settings">
        {status && <p>*{mapping[status]}</p>}
        {name && <h1 className="profile-user-name"> {name}</h1>}
        <button className="btn profile-edit-btn">РЕДАКТИРОВАТЬ</button>
        <button className="btn profile-edit-btn" onClick={this.handleSignOut}>
          ВЫХОД
        </button>
      </div>
    );
  }
}
ProfileSettings.propTypes = {
  name: PropTypes.string,
};

function mapStateToProps(state, props) {
  return {
    user: state.userAuth.entries,
  };
}
function mapDispatchToProps(dispatch, props) {
  return {
    userUnauth: () => dispatch(unAuth()),
  };
}

ProfileSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSettings);
