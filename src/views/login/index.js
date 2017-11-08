import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react';
import auth from '../../services/AuthService';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "error": false,
      "errorMessage": ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  handleShowError = (message, timeout) => {
    //Show error toast
    this.setState({
      "error": true,
      "errorMessage": message
    });
    setTimeout(() => {
      this.handleCloseError();
    }, timeout)
  }

  handleCloseError = () => {
    this.setState({
      "error": false,
      "errorMessage": ""
    });
  }

  handleSubmit() {
    //Validate fields
    auth.login({
      "email": this.state.email,
      "password": this.state.password
    }, (err, result) => {
      if (err) {
        this.handleShowError("Login failed, review your E-mail and Password", 2000);
        return;
      }
      this.props.history.push("/dashboard");
    });
  }

  componentWillMount() {
    if (auth.isAuthenticated()) {
      //Redirect to Dashboard
      this.props.history.push("/dashboard");
    }
  }

  render() {
    //Show an error message
    const errorMessage = (this.state.error) ?
      <Message onDismiss={this.handleCloseError} negative>
        <Message.Header>Error</Message.Header>
        <p>{this.state.errorMessage}</p>
      </Message>
      : null;
    return (
      <div className='login-form'>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: '25em' }}>
            {errorMessage}
            <Header as='h2' color='blue' textAlign='center'>
              React Dashboard Login
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Form.Input
                fluid
                placeholder='E-mail'
                name="email"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                placeholder='Password'
                type='password'
                name="password"
                onChange={this.handleChange}
              />
              <Button color='blue' fluid size='large'>Login</Button>
            </Form>
            <Message>
              <p><Link to="/signup">Sign up</Link></p>
              <p><Link to="/forgot-password">Forgot your password?</Link></p>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}