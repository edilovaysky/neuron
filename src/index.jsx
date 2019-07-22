import 'assets/global.scss';

import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import { Auth } from 'components/Auth';
import { Registration } from 'components/Registration';
import { GalleryContainer } from 'containers/GalleryContainer';
import { Profile } from 'components/Profile';

class App extends Component {
  state = {
    token: localStorage.getItem('token'),
    id: '',
    name: '',
  };

  handleSuccess = token => {
    this.setState({ token }, () => {
      localStorage.setItem('token', token);
    });
  };

  handleUser = (_id, status, lastName, firstName) => {
    this.setState({
      id: _id,
      lastName: lastName,
      name: firstName,
      status: status,
    });
  };

  /*   handleSignOut = event => {
    this.setState({ token: '', name: '' }, () => {
      localStorage.setItem('token', '');
      localStorage.setItem('name', '');
      localStorage.setItem('id', '');
    });
    event.preventDefault();
  }; */

  render() {
    const { token, id, image, name, isModalVisible } = this.state;
    //console.log(this.state);
    return (
      <Fragment>
        {/* token && <button onClick={this.handleSignOut}>Sign Out</button> */}
        <header>
          <div className="navbar">
            {!token || token == '' ? (
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
        {!token || token == '' ? (
          <Route
            path="/reg"
            render={() => (
              <Registration
                onSuccess={this.handleSuccess}
                handleUser={this.handleUser}
              />
            )}
            exact
          />
        ) : (
          <Redirect from="/reg" to="/prevatearea" />
        )}
        {!token || token == '' ? (
          <Route
            path="/auth"
            render={() => (
              <Auth
                onSuccess={this.handleSuccess}
                handleUser={this.handleUser}
              />
            )}
            exact
          />
        ) : (
          <Redirect from="/auth" to="/prevatearea" />
        )}
      </Fragment>
    );
  }
}

ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
