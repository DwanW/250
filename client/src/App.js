import React from 'react';
import './App.css';
import List from './components/List.js';
import Map from './components/map1.js';
import CRUD from './components/crud.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allLocations: [],
      filteredLocations: [],
      list:[],
      login: false,
      adminInterface:'',
    }
  }

  getList = async ()=>{
    // let data= await this.getData('http://localhost:5000/products');
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
    const data = await response.json(); // parses JSON response into native JavaScript objects
    // json.status = response.status;
    // json.statusText = response.statusText;
    let listNew =[];
    for (let i=0;i<data.length;i++){
      listNew.push(data[i]["name"])
    }
    console.log(listNew)
    this.setState({list:listNew})
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
    json.status = response.status;
    json.statusText = response.statusText;
    let arr1= Object.values(json);
    // await console.log(json)
    // return json;
    this.setState({ allLocations: arr1 })
  }

  displayLogin = async ()=>{
    console.log("clicked form admin login")
    this.setState({login:true})
    this.displayAdmin()
  }

  componentDidMount() {
    // console.log("on render")
    this.getData('http://localhost:5000/info')
    this.getList()
  }

  displayAdmin = ()=>{
    if (this.state.login===true){
      this.setState({adminInterface:<CRUD />}) 
    }
    else if(this.state.login===false){
      this.setState({adminInterface:''}) 
    }
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
        <button id="idLogin" onClick={this.displayLogin}>Admin Login</button><h1>FARMERS MARKETS</h1> 
        <div className="Main">
          
          {/* <Map pins={this.state.locations}/> */}
          <Map markers={this.state.allLocations} />
          <List items={this.state.list} />
        </div>
        <div>
        {this.state.adminInterface}
        </div>
      </div>
      
    );
  }
}

export default App;
