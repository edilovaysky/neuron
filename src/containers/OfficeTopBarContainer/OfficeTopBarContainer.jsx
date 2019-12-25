import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { unAuth } from 'actions/auth';
import { Btn } from 'components/Btn';
import { Note } from 'components/Note';

class ProfileSettings extends Component {
  state = {
    name: '',
    status: '',
    gen: '',
    active: this.props.user.user.active,
    orders: this.props.user.user.orders,
  };
  componentDidMount() {
    this.setState({
      name: `${this.props.user.user.firstName}  ${this.props.user.user.lastName}`,
      status: this.props.user.user.status,
      gen: this.props.user.user.gen,
    });
  }

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
  handleNotes = () => {
    console.log('orders must be shown');
  };
  render() {
    const { name, status, gen, active, orders } = this.state;
    let noteMsg;
    if (orders) {
      noteMsg = `Notes: ${orders.length}`;
    }

    let mapping;
    if (gen == 'm' || '') {
      mapping = {
        admin: 'aдмин',
        teacher: 'учитель',
        user: 'родитель',
        esquire: 'ADMIN',
        child: 'ученик',
      };
    } else {
      mapping = {
        admin: 'aдмин',
        teacher: 'учительница',
        user: 'родитель',
        esquire: 'ADMIN',
        child: 'ученица',
      };
    }
    let isActive;
    if (active) {
      isActive = 'top-nav-bar-status-active';
    } else {
      isActive = 'top-nav-bar-status';
    }
    return (
      <div className="top-nav-bar">
        <h5>личный кабинет</h5>
        <div className={isActive}>{status && <p>@{mapping[status]} </p>} </div>
        {name && <h3> {name}</h3>}

        <div className="top-nav-bar-btn-section">
          <Note onNotesClick={this.handleNotes} msg={noteMsg} />
        </div>
        <div className="top-nav-bar-btn-section">
          <Btn onBtnClick={this.handleSignOut} btnName={'ВЫХОД'} />
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
