import React from "react";

class LineItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    
    render() {       
        
        return (
            <div className="clLineItem">
               {this.props.name}
                {this.props.id}
            </div>
        )
    }
}

export default LineItem;