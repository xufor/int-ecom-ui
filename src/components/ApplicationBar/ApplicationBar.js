import React, { Component } from 'react';
import { Navbar, Nav, Modal, NavDropdown, Button, Form, Badge, Overlay, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select'

import { categories, brands, ratings, prices } from './selectionData';
import './style.css';

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
          <Button variant="primary">Login</Button>
          <Button
            variant="secondary"
            onClick={this.invertShowLoginModal}
          >
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
          <Button variant="primary">Signup</Button>
          <Button
            variant="secondary"
            onClick={this.invertShowSignupModal}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    return (
      <React.Fragment>
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
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={this.invertShowLoginModal} >Login</NavDropdown.Item>
                <NavDropdown.Item onClick={this.invertShowSignupModal} >Signup</NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item>Logout</NavDropdown.Item>
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

export default ApplicationBar;