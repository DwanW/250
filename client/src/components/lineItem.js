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
                <span>{this.props.id `${" "}`} Name: {this.props.name}</span>                
                <input /> 
               <button>Update Name</button>
               {/* <input/>  */}
               <button>Edit Products</button>
               Products: {this.props.products}
               <button id="idDeleteFarmer">Delete</button>
               
                
            </div>
        )
    }
}

export default LineItem;