import React, { Component } from 'react';
import Canvas from './Canvas'
import Suggestions from './Suggestions'
import './App.css'
import { talky } from './talky'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="CanvasContainer"><Canvas /></div>
        <Suggestions suggestions={['one', 'two', 'three']} />
      </div>
    );
  }
}

export default App;
