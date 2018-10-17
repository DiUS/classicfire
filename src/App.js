import React, { Component } from "react";
import Canvas from "./Canvas";
import Suggestions from "./Suggestions";
import Favourites from "./Favourites";
import "./App.css";

class App extends Component {
  state = {
    keywords: [],
    favourites: []
  };

  onSuggestions = suggestions => {
    const keywords = suggestions.slice(0, 3).map(s => s.keyword);
    this.setState({ keywords });
  };

  onSelect = item =>
    this.setState(state => ({
      favourites: Array.from(new Set([item, ...state.favourites])).slice(0, 3)
    }));

  render() {
    return (
      <div className="App">
        <div className="Title">Classic Fire</div>
        <div className="CanvasContainer">
          <Canvas onSuggestions={this.onSuggestions} />
        </div>
        <Suggestions
          suggestions={this.state.keywords}
          onSelect={this.onSelect}
        />
        <Favourites items={this.state.favourites} />
      </div>
    );
  }
}

export default App;
