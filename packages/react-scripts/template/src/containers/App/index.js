import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to mornya UI boilerplate</h1>
        </header>
        <p className="App-intro">
          To get started, edit
          {' '}
          <code>src/containers/App/index.jsx</code>
          {' '}
          and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
