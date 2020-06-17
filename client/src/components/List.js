import React from "react";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="List">
                Products
                <input id="idProductSearch" type="text" default="Search..."></input>
            </div>
        )
    }
}

export default List;