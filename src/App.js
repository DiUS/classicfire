import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AWS from 'aws-sdk'

const speechDemo = () => {
  AWS.config.region = 'ap-southeast-2';
  AWS.config.accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID;
  AWS.config.secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY;

  var polly = new AWS.Polly({apiVersion: '2016-06-10'});

  var params = {
      OutputFormat: 'mp3', /* required */
      Text: 'Hello Alex, can you run down to wholefoods and get me a chicken sammich', /* required */
      VoiceId: 'Joanna', /* required */
      SampleRate: '22050',
      TextType: 'text'
  };

  console.log({ params })

  polly.synthesizeSpeech(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data.AudioStream)
        var uInt8Array = new Uint8Array(data.AudioStream);
        var arrayBuffer = uInt8Array.buffer;
        var blob = new Blob([arrayBuffer]);
        var url = URL.createObjectURL(blob);

        const audioElement = document.createElement('audio')
        audioElement.src = url;
        audioElement.play();
      }
  });
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={speechDemo}>CLICK ME</button>
        </header>
      </div>
    );
  }
}

export default App;
