import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from './views/home';
import Login from './views/login';
import SignUp from './views/signup';
import ForgotPassword from './views/forgot-password';
import Dashboard from './views/dashboard';
import AuthService from './services/AuthService';
const auth = new AuthService();
class ProtectedRoute extends Component {
  render() {
    const comp = (auth.isAuthenticated()) ?
      <Route {...this.props} /> :
      <Redirect to={{
        pathname: '/',
        state: { from: this.props.location }
      }} />;
    return comp;
  }
}
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}