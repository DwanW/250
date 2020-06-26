import React from "react";
import LineItem from './lineItem.js';
// this app will handle everything to do with creating, remove, update, delete from an admin interface below the map

class CRUD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            rows:[],
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
        const json = await response.json(); // parses JSON response into native JavaScript objects
        // json.status = response.status;
        // json.statusText = response.statusText;
        // let arr1= Object.values(json);
        // console.log(Object.values(json))
        this.setState({ 
          data: Object.values(json),
        })
        // this.setState({markers:this.state.allLocations})
        return json;
        
      }

      makeRows =()=>{
        // let arr1= Object.values(this.state.data);
        let arr1=[]
        // console.log(this.state.data);
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
        console.log('wow')
        // this.makeRows()
      }

      componentDidUpdate(prevProps,prevState){
        console.log("hi from update");
        // console.log(prevState.data);
        
        if (prevState.data !== this.state.data){
            this.makeRows()
        }
      }

    render() {       
        // console.log(this.state.data)
        return (
            <div className="clAdmin">
               <h1>ADMIN</h1>
               <button onClick={()=>this.getData('http://localhost:5000/info')}>Refresh</button><br/>
               <button> Add global product </button> <input placeholder="Enter Product Name"></input>
               <br/>
               <button> Add Farmer </button>  <input placeholder="Enter Farm Name"></input> <input placeholder="Enter Farm Latitude" type="number"></input> <input placeholder="Enter Farm Longitude" type="number"></input>
               

                {this.state.rows}
            </div>
        )
    }
}

export default CRUD;