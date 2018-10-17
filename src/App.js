import React, { Component } from 'react';
import Canvas from './Canvas'
import Suggestions from './Suggestions'
import './App.css'

class App extends Component {
  state = {
    keywords: []
  }

  onSuggestions = (suggestions) => {
    const keywords = suggestions.slice(0, 3).map(s => s.keyword)
    this.setState({ keywords })
  }

  render() {
    return (
      <div className="App">
        <div className="CanvasContainer"><Canvas onSuggestions={this.onSuggestions} /></div>
        <Suggestions suggestions={this.state.keywords} />
      </div>
    );
  }
}

export default App;
