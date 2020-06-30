import React from 'react';
import './App.css';
import List from './components/List.js';
import Map from './components/map1.js';
import CRUD from './components/crud.js';
import getMarkersFromList from './util.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allLocations: [],
      markers:[],
      productList:[],
      login: false,
      checkedProduct:[],
    }
  }


  checked=(chk)=>{
    let tempList = this.state.checkedProduct;
    tempList.push(chk)
    this.setState({checkedProduct: tempList})

    // change markers to filteredLocations
    let filteredLocationList = getMarkersFromList(tempList,this.state.allLocations)
    this.setState({markers:filteredLocationList})
  }

  remove=(rem)=>{
    if (this.state.checkedProduct.includes(rem)){
      let arr1 = this.state.checkedProduct;
      let i = arr1.indexOf(rem);
      arr1.splice(i,1)
      this.setState({checkedProduct:arr1})
      if (arr1.length>0){
      let filteredLocationList = getMarkersFromList(arr1,this.state.allLocations)
      this.setState({markers:filteredLocationList})
      } else {
        this.setState({markers:this.state.allLocations})
      }
    }  
  }

  getList = async ()=>{
    const response = await fetch('http://localhost:5000/products', {
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
    const data = await response.json();
    // let listNew =[];
    // for (let i=0;i<data.length;i++){
    //   listNew.push(data[i]["name"])
    // }
    // this.setState({productList:listNew})
    this.setState({productList:data})
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
    });
    const json = await response.json(); 
    let arr1= Object.values(json);
    
    this.setState({ 
      allLocations: arr1,
    })
    this.setState({markers:this.state.allLocations})
  }

  componentDidMount() {
    this.getData('http://localhost:5000/info')
    this.getList()
  }


  render() {
    //=================sample locations ======================
    // let locations = [
    //   { name: 'Airdrie', latitude: 51.2927, longitude: -114.0134 },
    //   { name: 'Red Deer', latitude: 52.2690, longitude: -113.8116 },
    //   { name: 'Calgary', latitude: 51.0447, longitude: -114.0719 },
    //   { name: 'Cochrane', latitude: 51.1918, longitude: -114.4667 },
    // ]
    //========================================================
    
    return (
     
      <div className="App">
        <button id="idLogin" onClick={()=>this.setState({login:true})}>Admin Login</button><h1>FARMERS MARKETS</h1> 
        <div className="Main">
          
          {/* <Map pins={this.state.locations}/> */}
          <Map markers={this.state.markers} />
          <List
          checked={this.checked}
          remove={this.remove}
           items={this.state.productList} 
           />
        </div>
        <div>
        {this.state.login ? <CRUD products={this.state.productList}/> : null}
        </div>
      </div>
      
    );
  }
}

export default App;
