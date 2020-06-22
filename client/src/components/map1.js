import React from "react";
import GoogleApiWrapper from './googleAPI.js'

class OurMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers:[],
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.markers !== this.props.markers){
            this.setState({markers:this.props.markers})
        } 
    }
    render() {
        return (
            <div className="Mapouter" id='map' >
                <GoogleApiWrapper markers={this.state.markers} />
            </div>
        )
    }
}
export default OurMap;

// npm install --save google-maps-react