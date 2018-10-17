import React, { Component } from 'react';
import Canvas from './Canvas'
import './App.css'
import { talky } from './talky'

class App extends Component {
  render() {
    return (
      <div className="App">
        <button onClick={() => talky('something something dark side')}>CLICK ME</button>
        <Canvas />
      </div>
    );
  }
}

export default App;
