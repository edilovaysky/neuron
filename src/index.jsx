import 'assets/global.scss';

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { connect } from 'react-redux';

import { Auth } from 'components/Auth';
import { Registration } from 'components/Registration';
import { Profile } from 'components/Profile';
import { store, persistor } from './store';

class App extends Component {
  componentWillMount() {
    this.setState({
      token: this.props.user.token,
    });
  }

  handleSuccess = () => {
    this.setState({ token: this.props.user.token });
    console.log(this.state);
  };

  render() {
    const { token } = this.state;
    return (
      <>
        <header>
          <div className="navbar">
            {!token || token == '' || token == null ? (
              <Redirect from="/prevateroom" to="/auth" />
            ) : (
              <Link to="/prevatearea">ЛИЧНЫЙ КАБИНЕТ </Link>
            )}
            <br />
            <br />
            <Link to="/auth">АВТОРИЗАЦИЯ</Link>
            <br />
            <br />
            <Link to="/reg">РЕГИСТРАЦИЯ</Link>
          </div>
          {token && <Profile />}
        </header>
        {!token || token == '' || token == null ? (
          <Route
            path="/reg"
            render={() => <Registration onSuccess={this.handleSuccess} />}
            exact
          />
        ) : (
          <Redirect from="/reg" to="/prevatearea" />
        )}
        {!token || token == '' || token == null ? (
          <Route
            path="/auth"
            render={() => <Auth onSuccess={this.handleSuccess} />}
            exact
          />
        ) : (
          <Redirect from="/auth" to="/prevatearea" />
        )}
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
