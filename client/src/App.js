import React from 'react';
import './App.css';
import List from './components/List.js';
import Map from './components/map1.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allLocations: [],
      filteredLocations: [],
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
    this.setState({ locations: json })
  }

  componentDidMount() {
    this.getData('http://localhost:5000/farmers')
  }

  render() {
    //=================sample locations ======================
    let locations = [
      { name: 'Airdrie', latitude: 51.2927, longitude: -114.0134 },
      { name: 'Red Deer', latitude: 52.2690, longitude: -113.8116 },
      { name: 'Calgary', latitude: 51.0447, longitude: -114.0719 },
      { name: 'Cochrane', latitude: 51.1918, longitude: -114.4667 },
    ]
    //========================================================
    return (
      <div className="App">
        <div className="Main">

          {/* <Map pins={this.state.locations}/> */}
          <Map markers={locations} />
          <List />
        </div>
      </div>
    );
  }
}

export default App;
