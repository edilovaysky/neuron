import 'assets/global.scss';

import React, { Component } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { MainMenu } from 'components/MainMenu';
import { Auth } from 'components/Auth';
import { Office } from 'components/Office';
import { Registration } from 'components/Registration';
import { TestMail } from 'components/Registration/TestMail';
import { MakeUserActive } from 'components/MakeUserActive';
import { MakePassRecover } from 'components/MakePassRecover';
import { UserFeedBack } from 'components/UserFeedBack';

class App extends Component {
  state = {
    token: '',
    successReg: false,
  };
  componentDidMount() {
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

  hadleSuccessReg = () => {
    this.setState({ successReg: true });
  };

  render() {
    const { token, successReg } = this.state;
    const parent = true;

    return (
      <>
        <div className="navbar">
          {!token || token == '' || token == null ? (
            <MainMenu />
          ) : (
            <Redirect from="*" to="/my-office" />
          )}
        </div>
        <Switch>
          <Route
            path="/active/:id"
            render={props => <MakeUserActive id={props.match.params.id} />}
            exect
          />
          <Route
            path="/recover/:id"
            render={props => (
              <MakePassRecover id={props.match.params.id} parent={parent} />
            )}
            exect
          />
          <Route path="/home" render={() => <TestMail />} exact />
          <Route path="/feedback" render={() => <UserFeedBack />} exact />
          {!successReg ? (
            <Route
              path="/reg"
              render={() => (
                <Registration isSelfReg={true} onReg={this.hadleSuccessReg} />
              )}
              exact
            />
          ) : (
            <Redirect from="/reg" to="/" />
          )}
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
