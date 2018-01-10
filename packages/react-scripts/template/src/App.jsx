import React from 'react';

// To "Code Splitting", be importing React-Router modules by like this.
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import HashRouter from 'react-router-dom/es/HashRouter';
import Route from 'react-router-dom/es/Route';
//import Redirect from 'react-router-dom/es/Redirect';
//import Switch from 'react-router-dom/es/Switch';

import Main from 'main';
import Home from 'home';
import About from 'about';
import logo from './logo.svg';
import './App.scss';

const Router = window.history.pushState ? BrowserRouter : HashRouter;

/**
 * This is an app of entries.
 *
 * React-Router v4 example:
 *
 * <Router>
 *   <div>
 *     <Route exact path="/" component={Main}>
 *     <Route path="/home" component={Home}/>
 *     <Route path="/about" component={About}/>
 *     <Switch>
 *       <Redirect from="/me/project1" to="/project/1"/>
 *       <Redirect from="/me/project2" to="/project/2"/>
 *     </Switch>
 *     <Route exact path="/project" component={Project} />
 *     <Route path="/project/:no" component={Project} />
 *   </div>
 * </Router>
 */
export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to mornya UI boilerplate</h1>
        </header>

        <Route exact path="/" component={Main}/>
        <Route path="/home" component={Home}/>
        <Route path="/about" component={About}/>
      </div>
    </Router>
  );
}
