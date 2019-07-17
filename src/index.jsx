import 'assets/global.scss';

import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import { Auth } from 'components/Auth';
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

  handleUser = (_id, avatar, firstName) => {
    this.setState({ id: _id, image: avatar, name: firstName });
  };

  handleSignOut = event => {
    this.setState({ token: '' }, () => {
      localStorage.setItem('token', '');
    });
    event.preventDefault();
  };

  render() {
    const { token, id, image, name, isModalVisible } = this.state;
    return (
      <Fragment>
        {token && <button onClick={this.handleSignOut}>Sign Out</button>}
        <header>
          {token && <Profile image={image} name={name} id={id} />}
        </header>
        <Link to="/">Home</Link>
        <Link to="/auth">Auth</Link>

        <Route path="/posts" component={GalleryContainer} />
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
          <Redirect to="/posts" />
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
