import React, { Component } from 'react';
import Link from 'react-router-dom/es/Link';

class Main extends Component {
  render() {
    return (
      <div className="App-intro">
        <p>
          Now you can use these prepared dependencies at your code!
        </p>
        <p>
          <code>React v16</code>
          <code>FlowType</code>
          <code>Redux</code>
          <code>ReduxThunk</code>
          <code>Router v4</code>
        </p>
        <p>
          Below link is a routing sample:
          <span className="menu">
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
          </span>
        </p>
      </div>
    );
  }
}

export default Main;
