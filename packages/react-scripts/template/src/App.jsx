import React from 'react';

import Route from 'react-router-dom/es/Route';
//import Redirect from 'react-router-dom/es/Redirect';
//import Switch from 'react-router-dom/es/Switch';

import Main from 'main';
import Home from 'home';
import About from 'about';
import logo from './logo.svg';
import './App.scss';

/**
 * This is an app of entries.
 *
 * React-Router v4 example:
 *
 * <div>
 *   <Route exact path="/" component={Main}>
 *   <Route path="/home" component={Home}/>
 *   <Route path="/about" component={About}/>
 *   <Switch>
 *     <Redirect from="/me/project1" to="/project/1"/>
 *     <Redirect from="/me/project2" to="/project/2"/>
 *   </Switch>
 *   <Route exact path="/project" component={Project} />
 *   <Route path="/project/:no" component={Project} />
 * </div>
 */
export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to mornya UI boilerplate</h1>
      </header>

      <Route exact path="/" component={Main}/>
      <Route path="/home" component={Home}/>
      <Route path="/about" component={About}/>
    </div>
  );
}
