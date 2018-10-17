import React, { Component } from "react";
import Canvas from "./Canvas";
import Suggestions from "./Suggestions";
import Favourites from "./Favourites";
import LanguagePicker from './LanguagePicker';
import "./App.css";
import { talky } from './talky'

class App extends Component {
  state = {
    keywords: [],
    favourites: [],
    foundMatch: false,
    language: 'en-EN'
  };

  talk = (words) => talky(this.state.language, words)

  onLanguageSelect = (language) => {
    console.log('language', language)
    this.setState({ language })
  }

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
    }, 2000)
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
          talky={this.talk}
        />
        <Favourites items={this.state.favourites} talky={this.talk} />
        <LanguagePicker language={this.state.language} onSelectLanguage={this.onLanguageSelect} />
      </div>
    );
  }
}

export default App;
