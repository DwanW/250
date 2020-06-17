import React from 'react';
import './App.css';
import List from './components/List.js';
import Map from './components/map.js';

function App() {
  return (
    <div className="App">
      <div className="Main">
        <Map /><List />
      </div>
    </div>
  );
}

export default App;
