import React from "react";

class OurMap extends React.Component {

    render() {
        // let src = `https://www.google.ca/maps/@51.0222525,-114.2394325,10z?hl=en`;      
        let src = `https://maps.google.com/maps?q=calgary&t=&z=13&ie=UTF8&iwloc=&output=embed`;

             return (
                <div >
                    <div className="Mapouter">
                        <div className="Gmap_canvas">
                            <iframe title={this.props.title} width="100%" height="600" id="Gmap_canvas" src={src} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>

                        </div>
                    </div>
                </div>
        )
    }
}

export default OurMap;


// npm install --save google-maps-react