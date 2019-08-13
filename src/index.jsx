import 'assets/global.scss';

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { connect } from 'react-redux';

import { AuthMenu } from 'components/AuthMenu';
import { Auth } from 'components/Auth';
import { Registration } from 'components/Registration';
import { Office } from 'components/Office';
import { store, persistor } from './store';

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
          {!token || token == '' || token == null ? <AuthMenu /> : <></>}
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
              path="/reg"
              render={() => <Registration onSuccess={this.handleSuccess} />}
              exact
            />
          ) : (
            <Redirect from="/reg" to="/my-office" />
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

App = connect(mapStateToProps)(App);

ReactDom.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
