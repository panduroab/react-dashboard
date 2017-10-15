import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

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
                        <a href="/login">Login</a>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        <a href="/signup">Sign Up</a>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}