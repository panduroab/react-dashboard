import React, { Component } from 'react';
import './login.css';
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react';
import AuthService from '../../services/AuthService';
const auth = new AuthService();

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(key) {
    return function (e, index, value) {
      var state = {};
      state[key] = e.target.value || value;
      this.setState(state);
    }.bind(this);
  }

  handleLogin() {
    //Validate fields
    //Send login request
    //Handle response
  }

  componentWillMount() {
    if (auth.isAuthenticated()) {
      //Redirect to Dashboard
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className='login-form'>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: '25em' }}>
            <Header as='h2' color='blue' textAlign='center'>
              React Dashboard Login
            </Header>
            <Form size='large'>
              <Form.Input
                fluid
                placeholder='E-mail'
                onChange={this.handleChange("email")}
              />
              <Form.Input
                fluid
                placeholder='Password'
                type='password'
                onChange={this.handleChange("password")}
              />
              <Button onClick={this.handleLogin} color='blue' fluid size='large'>Login</Button>
            </Form>
            <Message>
              <p><a href="/signup">Sign up</a></p>
              <p><a href="/forgot-password">Forgot your password?</a></p>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}