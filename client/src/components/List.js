import React from "react";


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            searchValue: '',
        }
    }

    onChecked = (e) => {
        if (e.target.checked) {
            this.props.checked(e.target.value)
        } else {
            this.props.remove(e.target.value)
        }
    }

    makeProducts = (listArr) => {
        let arr1 = [];
        for (let i = 0; i < listArr.length; i++) {
            arr1.push(<li key={i}><input onChange={this.onChecked} type="checkbox" value={listArr[i]} />{listArr[i]}</li>)
        }
        this.setState({ products: arr1 })
    }
    componentDidMount() {
        let listNew =[];
        for (let i=0;i<this.props.items.length;i++){
          listNew.push(this.props.items[i]["name"])
        }
    
        this.makeProducts(listNew);
    }


    handleSearchChange = (e) => {
        this.setState({ searchValue: e.target.value });
        let listNew =[];
        for (let i=0;i<this.props.items.length;i++){
                listNew.push(this.props.items[i]["name"])
            }
        let tempArr = listNew.filter(str => { return str.toLowerCase().includes(e.target.value.toLowerCase()) });
        this.makeProducts(tempArr);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.items !== this.props.items) {
            let listNew =[];
            for (let i=0;i<this.props.items.length;i++){
                listNew.push(this.props.items[i]["name"])
            }
            this.makeProducts(listNew)
        }
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