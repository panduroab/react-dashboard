import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Grid>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        Home > Grid > Column
                </Grid.Column>
                </Grid>
                <Grid>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Link to="/login">Login</Link>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Link to="/signup">Sign Up</Link>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}