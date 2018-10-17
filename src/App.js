import React, { Component } from "react";
import Canvas from "./Canvas";
import Suggestions from "./Suggestions";
import Favourites from "./Favourites";
import "./App.css";

class App extends Component {
  state = {
    keywords: [],
    favourites: [],
    foundMatch: false
  };

  onSuggestions = suggestions => {
    const keywords = suggestions.slice(0, 3).map(s => s.keyword);
    this.setState({ keywords });
  };

  onSelect = item => {
    this.setState(state => ({
      favourites: Array.from(new Set([item, ...state.favourites])).slice(0, 3),
      foundMatch: true
    }));

    setTimeout(() => {
      this.setState({foundMatch: false})
    }, 1500)
  }

  render() {
    return (
      <div className="App">
        <div className="Title">Classic Fire</div>
        <div className="CanvasContainer">
          <Canvas onSuggestions={this.onSuggestions} foundMatch={this.state.foundMatch} />
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
