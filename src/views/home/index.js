import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
        <Marker
            position={{ lat: -34.397, lng: 150.644 }}
        />
    </GoogleMap>
));

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
                <Grid>
                    <Grid.Column>
                        <MapWithAMarker
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}