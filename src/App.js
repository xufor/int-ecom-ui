import React, { Component } from 'react';
import ApplicationBar from './components/ApplicationBar/ApplicationBar';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import './App.css';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <ApplicationBar />
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
