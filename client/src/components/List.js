import React from "react";


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            searchValue: '',
        }
    }

    onChecked=(e)=>{
        console.log(e.target.value)
        if (e.target.checked){
            this.props.checked(e.target.value)
        } else {
            this.props.remove(e.target.value)
        }
    }
    
    makeProducts = (listArr) => {
        let arr1 = [];
        // console.log(listArr)
        for (let i = 0; i < listArr.length; i++) {
            arr1.push(<li key={i}><input onChange={this.onChecked} type="checkbox" value={listArr[i]}/>{listArr[i]}</li>)
        }
        this.setState({ products: arr1 })
    }
    componentDidMount() {   
        this.makeProducts(this.props.items);
    }


    handleSearchChange = (e) => {
        this.setState({ searchValue: e.target.value });
        
        let tempArr = this.props.items.filter(str =>{return str.toLowerCase().includes(e.target.value.toLowerCase())});
        this.makeProducts(tempArr);
    }

    componentDidUpdate(prevProps){
        if(prevProps.items !== this.props.items){
            this.makeProducts(this.props.items)
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