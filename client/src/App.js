import React from 'react';
import './App.css';
import List from './components/List.js';
import Map from './components/map.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allLocations:[],
      filteredLocations:[],
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
    json.status = response.status;
    json.statusText = response.statusText;
    // await console.log(json)
    // return json;
    this.setState({locations: json})
  }

  componentDidMount(){
    this.getData('http://localhost:5000/farmers')
  }

  render(){
  return (
    <div className="App">
      <div className="Main">
      
        <Map pins={this.state.locations}/>
        <List />
      </div>
    </div>
  );
}}

export default App;
