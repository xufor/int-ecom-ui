import React, { Component } from 'react';
import { Button, Overlay, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select'

import './style.css';
import { categories, brands, ratings, prices } from './selectionData';


class CatergoriesBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: categories[0],
      selectedBrands: [],
      selectedRating: null,
      selectedPrice: null,
    };
    this.overlayContainerRef = React.createRef();
  }

  onCategoriesInputChange = (event, info) => {
    this.setState({ [info.name]: event });
  }

  categoriesOverlayMaker = () => {
    const selects = (
      <React.Fragment>
        <Select
          name={"selectedCategory"}
          value={this.state.selectedCategory}
          options={categories}
          onChange={this.onCategoriesInputChange}
          className={"basic-multi-select categories-selects mb-1"}
          classNamePrefix={"select"}
          isSearchable
        />
        <Select
          isMulti
          placeholder={"Select Brand"}
          name={"selectedBrands"}
          value={this.state.selectedBrands}
          onChange={this.onCategoriesInputChange}
          options={brands[this.state.selectedCategory.value]}
          className={"basic-multi-select categories-selects mb-1"}
          classNamePrefix={"select"}
          isSearchable
        />
        <Select
          placeholder={"Select Minimum Rating"}
          options={ratings}
          onChange={this.onCategoriesInputChange}
          name={"selectedRating"}
          value={this.state.selectedRating}
          className={"basic-multi-select categories-selects mb-1"}
          classNamePrefix={"select"}
          isClearable
          isSearchable
        />
        <Select
          placeholder={"Select Maximum Price"}
          options={prices}
          onChange={this.onCategoriesInputChange}
          name={"selectedPrice"}
          value={this.state.selectedPrice}
          className={"basic-multi-select categories-selects mb-1"}
          classNamePrefix={"select"}
          isClearable
          isSearchable
        />
        <Button variant="success">
          Apply
        </Button>
      </React.Fragment>
    );

    return (
      <div ref={this.overlayContainerRef}>
        <Overlay
          show={this.props.show}
          placement={"bottom"}
          target={this.props.target}
          container={this.overlayContainerRef.current}
          containerPadding={10}
        >
          <Popover id={"cat-popover"}>
            <Popover.Content>
              {selects}
            </Popover.Content>
          </Popover>
        </Overlay>
      </div>
    );
  }

  render() {
    return this.categoriesOverlayMaker();
  }
}

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};


export default connect(null, mapActionToProps)(CatergoriesBox);