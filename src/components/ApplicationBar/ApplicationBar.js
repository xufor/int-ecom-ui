import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import './style.css';

class ApplicationBar extends Component {
  render() {
    return (
      <AppBar position="static" color="secondary">
        <Toolbar className={"justify-between"}>
          <img 
          id={"app-bar-logo-image"} 
          className={"mr1"} 
          src={"assets/images/app-logo.svg"} 
          alt={"app-logo"} 
          />
          <Button
            variant="text"
            color="inherit"
          >
            Login/Signup
            </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default ApplicationBar;