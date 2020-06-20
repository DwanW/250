import React from "react";
import GoogleApiWrapper from './googleAPI.js'

class OurMap extends React.Component {

    render() {
        return (
            <div className="Mapouter" id='map' >
                <GoogleApiWrapper markers={this.props.markers} />
            </div>
        )
    }
}
export default OurMap;

// npm install --save google-maps-react