import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import HomePage from './components/HomePage/HomePage';
import AppBar from './components/AppBar/AppBar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <AppBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Redirect to={"/"}/>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
