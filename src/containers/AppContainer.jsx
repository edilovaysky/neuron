import 'assets/global.scss';

import React, { Component } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { AuthMenu } from 'components/AuthMenu';
import { Auth } from 'components/Auth';
import { Office } from 'components/Office';

class App extends Component {
  componentWillMount() {
    this.setState({
      token: this.props.user.token,
    });
  }

  handleSuccess = () => {
    this.setState({ token: this.props.user.token });
  };

  handleSignOut = () => {
    this.setState({ token: this.props.user.token });
  };

  render() {
    const { token } = this.state;
    return (
      <>
        <div className="navbar">
          {!token || token == '' || token == null ? (
            <AuthMenu />
          ) : (
            <Redirect from="*" to="/my-office" />
          )}
        </div>
        <Switch>
          {token && (
            <Route
              path="/my-office"
              render={() => <Office onSignOut={this.handleSignOut} />}
              exact
            />
          )}

          {!token || token == '' || token == null ? (
            <Route
              path="/auth"
              render={() => <Auth onSuccess={this.handleSuccess} />}
              exact
            />
          ) : (
            <Redirect from="/auth" to="/my-office" />
          )}
        </Switch>
      </>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.userAuth.entries,
  };
}

export const AppContainer = connect(mapStateToProps)(App);
