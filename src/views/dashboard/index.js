import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
const auth = new AuthService();

export default class Dashboard extends Component {
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout() {
        auth.logout(() => {
            this.props.history.push("/");
        });
    }
    render() {
        return (
            <div>
                Protected Dashboard
                <a onClick={this.handleLogout}>Logout</a>
            </div>
        );
    }
}