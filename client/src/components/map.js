import React from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// import GoogleMapReact, {Marker} from 'google-map-react';

const mapStyles = {
    width: 800,
    height: 600,
  };


class OurMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pins: [],
        }
    }

    makePins=()=>{
        let arr1=[];
        let pins = this.props.pins
        for(let i=0;i<pins.length;i++){
            arr1.push(
                <Marker position={{ lat:pins[i].latitude, long:pins[i].longitude}}/>
            )
        }
        this.setState({pins: arr1})
    }

    render() {
        // AIzaSyDD1Q2634NBdkrEv3zFY-aOOxKe0pgJHIU
        // let src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDD1Q2634NBdkrEv3zFY-aOOxKe0pgJHIU&q=Calgary,+AB`;      
        // let src = `https://maps.google.com/maps?q=calgary&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        
             return (
                <div id='map' >
                    <Map
                    google={this.props.google}
                    zoom={8}
                    style={mapStyles}
                    initialCenter={{ lat: 51.5, lng: -114}}
                    className={'clMap'}
                    >
                    {this.state.pins}
                    </Map>

                    <button onClick={this.makePins}>Click </button>
                    {/* <div className="Mapouter">
                        <div id="map" className="Gmap_canvas">
                            <iframe title={this.props.title} width="100%" height="600" id="Gmap_canvas" src={src} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>

                        </div> */}
                    
                </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDD1Q2634NBdkrEv3zFY-aOOxKe0pgJHIU'
  })(OurMap);
// export default OurMap;

// npm install --save google-maps-react