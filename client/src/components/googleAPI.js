import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '500px',
};
export class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
        };
    }
    displayMarkers = () => {
        return this.props.markers.map((pin, index) => {
            return <Marker key={index} id={index}
                position={{ lat: pin.latitude, lng: pin.longitude }}
                onClick={this.onMarkerClick} name={`${pin.name} /n ${pin.products}`}
            />
        })
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    render() {
        // console.log(this.props.markers)
        return (
            <Map
                google={this.props.google}
                zoom={6}
                style={mapStyles}
                initialCenter={{ lat: 53.5461, lng: -113.4938 }}>

                {this.displayMarkers()}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>


            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCUFDKKfcxtx6iGI-c54ssEV8L-PxEoAb8'
})(MapContainer);

