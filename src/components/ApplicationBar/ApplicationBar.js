import React, { Component } from 'react';
import { Navbar, Nav, Modal, NavDropdown, Button, Form, Badge, Overlay, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingBar from 'react-redux-loading-bar'
import { Link } from 'react-router-dom';
import Select from 'react-select'

import './style.css';
import { categories, brands, ratings, prices } from './selectionData';
import { signinAction } from '../../actions/signinAction';
import { signupAction } from '../../actions/signupAction';
import { getProfileAction } from '../../actions/getProfileAction';


class ApplicationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCategoryOverlay: false,
      targetForOverlay: null,
      selectedCategory: categories[0],
      selectedBrands: null,
      loginUsername: "",
      loginPassword: "",
      signupUsername: "",
      signupPassword: "",
      signupEmail: "",
      signupName: "",
      signupDob: "",
      showLoginModal: false,
      showSignupModal: false,
      selectedRating: null,
      selectedPrice: null,
    };
    this.overlayContainerRef = React.createRef();
  }

  componentDidUpdate() {
    // loads the profile once the login is confirmed
    if (this.props.jwt != null && this.props.profile === null) {
      this.props.getProfileAction();
    }
  }

  onClickCategories = (event) => {
    this.setState({
      targetForOverlay: event.target,
      showCategoryOverlay: !this.state.showCategoryOverlay
    });
  }

  onCategoryChange = (event) => {
    this.setState({ selectedCategory: event, selectedBrands: null });
  }

  onBrandChange = (event) => {
    this.setState({ selectedBrands: event });
  }

  onRatingChange = (event) => {
    this.setState({ selectedRating: event });
  }

  onPriceChange = (event) => {
    this.setState({ selectedPrice: event });
  }

  onLoginSignupInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  invertShowLoginModal = () => {
    this.setState({ showLoginModal: !this.state.showLoginModal });
  }

  invertShowSignupModal = () => {
    this.setState({ showSignupModal: !this.state.showSignupModal });
  }

  onClickLogin = () => {
    this.props.signinAction(this.state.loginUsername, this.state.loginPassword);
    this.setState({ showLoginModal: false });
  }

  onClickSignup = () => {
    const { signupUsername, signupPassword, signupName, signupEmail, signupDob } = this.state;
    this.props.signupAction(
      signupUsername, 
      signupPassword,
      signupName,
      signupEmail,
      Date.parse(signupDob) / 1000
      );
    this.setState({ showLoginModal: false });
  }

  categoriesOverlayMaker = () => {
    const selects = (
      <React.Fragment>
        <Select
          value={this.state.selectedCategory}
          options={categories}
          onChange={this.onCategoryChange}
          className={"basic-multi-select categories-selects mb-1"}
          classNamePrefix={"select"}
          isSearchable
        />
        <Select
          isMulti
          placeholder={"Select Brand"}
          value={this.state.selectedBrands}
          onChange={this.onBrandChange}
          options={brands[this.state.selectedCategory.value]}
          className={"basic-multi-select categories-selects mb-1"}
          classNamePrefix="select"
          isSearchable
        />
        <Select
          placeholder={"Select Minimum Rating"}
          options={ratings}
          onChange={this.onRatingChange}
          value={this.state.selectedRating}
          className={"basic-multi-select categories-selects mb-1"}
          classNamePrefix={"select"}
          isSearchable
        />
        <Select
          placeholder={"Select Maximum Price"}
          options={prices}
          onChange={this.onPriceChange}
          value={this.state.selectedPrice}
          className={"basic-multi-select categories-selects mb-1"}
          classNamePrefix={"select"}
          isSearchable
        />
        <Button variant="success">
          Apply
        </Button>
      </React.Fragment>
    );

    return (
      <Overlay
        show={this.state.showCategoryOverlay}
        placement={"bottom"}
        target={this.state.targetForOverlay}
        container={this.overlayContainerRef.current}
        containerPadding={10}
      >
        <Popover id={"popover-contained"}>
          <Popover.Content>
            {selects}
          </Popover.Content>
        </Popover>
      </Overlay>
    );
  }

  loginModalMaker = () => {
    const loginInputs = (
      <Form>
        <Form.Group controlId={"loginUsername"}>
          <Form.Label>Username</Form.Label>
          <Form.Control type={"text"}
            onChange={this.onLoginSignupInputChange}
            value={this.state.loginUsername}
            placeholder={"Enter Username"}
          />
        </Form.Group>
        <Form.Group controlId={"loginPassword"}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={"password"}
            value={this.state.loginPassword}
            onChange={this.onLoginSignupInputChange}
            placeholder={"Enter Password"}
          />
        </Form.Group>
      </Form>
    );

    return (
      <Modal
        show={this.state.showLoginModal}
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>{loginInputs}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.onClickLogin}>
            Login
          </Button>
          <Button variant="secondary" onClick={this.invertShowLoginModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  signupModalMaker = () => {
    const signupInputs = (
      <Form>
        <Form.Group controlId={"signupUsername"}>
          <Form.Label>Username</Form.Label>
          <Form.Control type={"text"}
            onChange={this.onLoginSignupInputChange}
            value={this.state.signupUsername}
            placeholder={"Enter Username"}
          />
        </Form.Group>
        <Form.Group controlId={"signupPassword"}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={"password"}
            value={this.state.signupPassword}
            onChange={this.onLoginSignupInputChange}
            placeholder={"Enter Password"}
          />
        </Form.Group>
        <Form.Group controlId={"signupEmail"}>
          <Form.Label>Email</Form.Label>
          <Form.Control type={"email"}
            onChange={this.onLoginSignupInputChange}
            value={this.state.signupEmail}
            placeholder={"Enter Email"}
          />
        </Form.Group>
        <Form.Group controlId={"signupName"}>
          <Form.Label>Name</Form.Label>
          <Form.Control type={"text"}
            onChange={this.onLoginSignupInputChange}
            value={this.state.signupName}
            placeholder={"Enter Name"}
          />
        </Form.Group>
        <Form.Group controlId={"signupDob"}>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type={"date"}
            onChange={this.onLoginSignupInputChange}
            value={this.state.signupDob}
            placeholder={"Enter Name"}
          />
        </Form.Group>
      </Form>
    );

    return (
      <Modal
        show={this.state.showSignupModal}
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>{signupInputs}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.onClickSignup}>
            Signup
          </Button>
          <Button variant="secondary" onClick={this.invertShowSignupModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  renderDropdownItemsBasedOnLogin = () => {
    if (this.props && this.props.jwt == null) {
      return (
        <React.Fragment>
          <NavDropdown.Item onClick={this.invertShowLoginModal} >Login</NavDropdown.Item>
          <NavDropdown.Item onClick={this.invertShowSignupModal} >Signup</NavDropdown.Item>
        </React.Fragment>
      );
    }
    else {
      return (
        <React.Fragment>
          <NavDropdown.Item>Profile</NavDropdown.Item>
          <NavDropdown.Item>Logout</NavDropdown.Item>
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        <LoadingBar style={{ backgroundColor: '#FF0000', zIndex: 1000 }} />
        <Navbar bg="light" expand="lg" >
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
            <Nav className="mr-auto" ref={this.overlayContainerRef}>
              <Nav.Link as={"div"} ><Link to="/" className={"text-link"}>Home</Link></Nav.Link>
              <Nav.Link as={"div"} id={'categories-text'} onClick={this.onClickCategories} >
                Categories
              </Nav.Link>
              {this.categoriesOverlayMaker()}
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
                <Badge>9</Badge>
              </Link>
            </Nav.Link>
            <Nav>
              <NavDropdown
                title={this.props.profile ? this.props.profile.name : "Account"}
                id="basic-nav-dropdown"
              >
                {this.renderDropdownItemsBasedOnLogin()}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.loginModalMaker()}
        {this.signupModalMaker()}
      </React.Fragment>
    );
  }
}

const mapActionToProps = (dispatch) => {
  return bindActionCreators({ signinAction, signupAction, getProfileAction }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    jwt: state.jwt,
    profile: state.profile,
  }
};

export default connect(mapStateToProps, mapActionToProps)(ApplicationBar);