import React from "react";

let listOfProducts = ['potatoes', 'canola oil', 'milk', 'beef', 'spaghetti', 'pork', 'rossetta', 'rice','peas','cake']

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            searchValue: '',
        }
    }

    makeProducts = (listArr) => {
        let arr1 = [];
        for (let i = 0; i < listArr.length; i++) {
            arr1.push(<li key={i}>{listArr[i]}</li>)
        }
        this.setState({ products: arr1 })
    }
    componentDidMount() {
        this.makeProducts(listOfProducts);
    }


    handleSearchChange = (e) => {
        this.setState({ searchValue: e.target.value });
        let tempArr = listOfProducts.filter(str =>{return str.toLowerCase().includes(e.target.value.toLowerCase())});
        this.makeProducts(tempArr);
    }

    render() {       
    
        return (
            <div className="List">
                Products
                <input value={this.state.searchValue} onChange={this.handleSearchChange} id="idProductSearch" type="text" default="Search..."></input>
                <ul>
                    {this.state.products}
                </ul>

            </div>
        )
    }
}

export default List;