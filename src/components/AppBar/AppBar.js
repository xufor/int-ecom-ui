import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingBar from 'react-redux-loading-bar'
import { Link } from 'react-router-dom';
import { isEmpty, isNull, keys } from 'lodash';

import './style.css';
import { getProfileAction } from '../../actions/getProfileAction';
import SigninBox, { invertShowSigninModal } from '../SigninBox/SigninBox';
import SignupBox, { invertShowSignupModal } from '../SignupBox/SignupBox';
import ProfileBox, { invertShowProfileModal } from '../ProfileBox/ProfileBox';
import { resetStoreAction } from '../../actions/resetStoreAction';
import CategoriesBox from '../CatergoriesBox/CategoriesBox';
import { persistor } from '../../index';


class AppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCategoryOverlay: false,
      targetForOverlay: null
    };
  }

  componentDidUpdate() {
    // loads the profile once the login is confirmed
    if (this.props.isLoggedIn && isEmpty(this.props.profile)) {
      this.props.getProfileAction();
    }
  }

  onClickCategories = (event) => {
    this.setState({
      targetForOverlay: event.target,
      showCategoryOverlay: !this.state.showCategoryOverlay
    });
  }

  onClickLogout = () => {
    persistor.purge().then(() => this.props.resetStoreAction());
  }

  renderDropdownItemsBasedOnLogin = () => {
    if (!this.props.isLoggedIn) {
      return (
        <React.Fragment>
          <NavDropdown.Item onClick={invertShowSigninModal} >
            Signin
          </NavDropdown.Item>
          <NavDropdown.Item onClick={invertShowSignupModal} >
            Signup
          </NavDropdown.Item>
        </React.Fragment>
      );
    }
    else {
      return (
        <React.Fragment>
          <NavDropdown.Item onClick={invertShowProfileModal}>
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item as={"div"}>
            <Link to="/history" className={"text-link"}>
              Orders
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item onClick={this.onClickLogout}>
            Logout
          </NavDropdown.Item>
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        <LoadingBar style={{ backgroundColor: '#FF0000', zIndex: 55555 }} />
        <Navbar
          bg={"light"}
          expand={"lg"}
          sticky={"top"}
          ref={this.overlayContainerRef}
          className={"border-bottom"}
        >
          <Navbar.Brand>
            <Link to="/">
              <img
                src="assets\images\app-logo.png"
                width="207"
                height="42"
                className="d-inline-block align-top"
                alt="app-logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={"div"} ><Link to="/" className={"text-link"}>Home</Link></Nav.Link>
              <Nav.Link as={"div"} id={'categories-text'} onClick={this.onClickCategories} >
                Categories
              </Nav.Link>
              <CategoriesBox
                target={this.state.targetForOverlay}
                show={this.state.showCategoryOverlay}
              />
            </Nav>
            <Nav.Link as={"div"}>
              <Link to={"cart"} className={"text-link"}>
                <Badge>
                  <img
                    src="assets\images\cart.png"
                    width="20"
                    height="20"
                    className="d-inline-block align-top"
                    alt="app-logo"
                  />
                </Badge>
                <Badge className="text-black-50" >{this.props.cartItemCount}</Badge>
              </Link>
            </Nav.Link>
            <Nav>
              <NavDropdown
                title={isEmpty(this.props.profile) ? "Account": this.props.profile.name}
                id="basic-nav-dropdown"
              >
                {this.renderDropdownItemsBasedOnLogin()}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <SigninBox />
        <SignupBox />
        <ProfileBox />
      </React.Fragment>
    );
  }
}

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    getProfileAction,
    resetStoreAction
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !isNull(state.jwt),
    profile: state.profile,
    cartItemCount: keys(state.cartItems).length
  }
};

export default connect(mapStateToProps, mapActionToProps)(AppBar);