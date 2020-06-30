import React from "react";
import LineItem from './lineItem.js';
// this app will handle everything to do with creating, remove, update, delete from an admin interface below the map

class CRUD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            rows:[],
            addGlobalProduct:"",
            addNewFarmer:{},
        }
    }

    async getData(inputurl) {
        const response = await fetch(inputurl, {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrer: "no-referrer",
          // body: JSON.stringify(data),
        });
        const json = await response.json();
        let arr1= Object.values(json)
        this.setState({ 
          data: arr1,
        })
        return json;
      }

      async serverAddProduct(inputurl, data={}) {
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


      makeRows =()=>{
        let arr1=[]
        for (let i=0;i<this.state.data.length;i++){ 
            arr1.push(<LineItem 
                name={this.state.data[i].name}
                id={this.state.data[i].id}
                key={this.state.data[i].id}
                products={this.state.data[i].products}
                productList={this.props.products}
            />)
        }
        this.setState({rows:arr1})
      }

      componentDidMount() {
        this.getData('http://localhost:5000/info')
      }

      componentDidUpdate(prevProps,prevState){
        if (prevState.data !== this.state.data){
            this.makeRows()
        }
      }

      handleProductFieldChange=(e)=>{
        this.setState({addGlobalProduct:e.target.value})
      }

      handleAddProductButton=()=>{
        const str=this.state.addGlobalProduct
        this.serverAddProduct('http://localhost:5000/products/'+str)
      }

      handleFarmVariableChange = (obj) => {
        let tempFarm = {...obj};
        this.setState({addNewFarmer: {...this.state.addNewFarmer, ...tempFarm}})
      }

    render() {       
        return (
            <div className="clAdmin">
               <h1>ADMIN</h1>
               <button onClick={()=>this.getData('http://localhost:5000/info')}>Refresh</button><br/>
               <button onClick={this.handleAddProductButton}> Add global product </button> <input onChange={this.handleProductFieldChange} placeholder="Enter Product Name"></input>
               <br/>
               <button onClick={()=> this.serverAddProduct('http://localhost:5000/farmers/add',this.state.addNewFarmer)}> Add Farmer </button>  
               <input onChange={(e) => this.handleFarmVariableChange({name:e.target.value})} placeholder="Enter Farm Name" /> 
               <input onChange={(e) => this.handleFarmVariableChange({Latitude:e.target.value})}placeholder="Enter Farm Latitude" type="number" /> 
               <input onChange={(e) => this.handleFarmVariableChange({Longitude:e.target.value})}placeholder="Enter Farm Longitude" type="number" />
                {this.state.rows}
            </div>
        )
    }
}

export default CRUD;