import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Button, Badge, Overlay, Popover } from 'react-bootstrap';
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
    };
    this.overlayContainerRef = React.createRef();
    this.selectedRating = null;
    this.selectedPrice = null;
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
    this.selectedRating = event;
    console.log(this.selectedPrice);
    console.log(this.selectedRating);
  }

  onPriceChange = (event) => {
    this.selectedPrice = event;
  }

  categoriesOverlayMaker = () => {
    const selects = (
      <React.Fragment>
        <Select
          defaultValue={[this.state.selectedCategory]}
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
          className={"basic-multi-select categories-selects mb-1"}
          classNamePrefix={"select"}
          isSearchable
        />
        <Select
          placeholder={"Select Maximum Price"}
          options={prices}
          onChange={this.onPriceChange}
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
                <NavDropdown.Item>Login</NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default ApplicationBar;