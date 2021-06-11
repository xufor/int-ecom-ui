import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import HomePage from './components/HomePage/HomePage';
import ApplicationBar from './components/ApplicationBar/ApplicationBar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <ApplicationBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Redirect to={"/"}/>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
