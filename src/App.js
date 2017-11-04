import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './views/home';
import Login from './views/login';
import SignUp from './views/signup';
import ForgotPassword from './views/forgot-password';
import Dashboard from './views/dashboard';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}