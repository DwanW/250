import React from 'react'

class LineItemInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked,
        }
    }

    async serverAddProductToFarmer(inputurl, data = {}) {
        //   {
        //     "product_id": 1, from the selected boxes
        //     "farmer_id":1 from this.props.id
        // }
        const response = await fetch(inputurl, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(data),
        });
        const json = await response.json();
        return json;
    }

    onCheckboxClick = () => {
        if (this.state.checked) {
            //remove
            console.log('item removed')
        } else if (this.state.checked === false) {
            //add 
            console.log(this.props.farmerID);
            console.log(this.props.productID);
            
            
            this.serverAddProductToFarmer('http://localhost:5000/productlist', {product_id: this.props.productID, farmer_id:this.props.farmerID})
        }
        this.setState({})
    }


    // this.serverAddProductToFarmer(url+'/productlist', {product_id: ,farmer_id:this.props.id})
    render() {

        return (
            <div><input type="checkbox" onChange={this.onCheckboxClick} defaultChecked={this.state.checked} value={this.props.name} /> {this.props.name}</div>
        )
    };
}

export default LineItemInput