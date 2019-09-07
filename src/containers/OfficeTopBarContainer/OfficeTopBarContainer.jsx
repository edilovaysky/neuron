import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { unAuth } from 'actions/auth';

class ProfileSettings extends Component {
  componentWillMount() {
    this.setState({
      name: `${this.props.user.user.firstName}  ${this.props.user.user.lastName}`,
      status: this.props.user.user.status,
      gen: this.props.user.user.gen,
    });
  }
  componentDidMount() {}

  handleSignOut = event => {
    const { onSignOut } = this.props;
    console.log(this.props);
    const { userUnauth } = this.props;
    userUnauth(this.props.user.user.token);
    event.preventDefault();
    setTimeout(() => {
      onSignOut();
    }, 0);
  };
  render() {
    const { name, status, gen } = this.state;
    let mapping;
    if (gen == 'm' || '') {
      mapping = {
        admin: 'aдмин',
        teacher: 'учитель',
        user: 'ученик',
        esquire: 'ADMIN',
      };
    } else {
      mapping = {
        admin: 'aдмин',
        teacher: 'учительница',
        user: 'ученица',
        esquire: 'ADMIN',
      };
    }

    return (
      <div className="top-nav-bar">
        <h5>личный кабинет</h5>
        <div className="top-nav-bar-status">
          {status && <p>*{mapping[status]} </p>}
        </div>
        {name && <h3> {name}</h3>}
        <div className="top-nav-bar-btn-section">
          {/*  <button className="top-btn">РЕДАКТИРОВАТЬ</button> */}
          <button className="top-btn" onClick={this.handleSignOut}>
            ВЫХОД
          </button>
        </div>
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

export const OfficeTopBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSettings);
