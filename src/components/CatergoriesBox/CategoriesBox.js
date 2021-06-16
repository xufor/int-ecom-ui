import React, { Component } from 'react';
import { Button, Overlay, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select'

import './style.css';
import { categories, brands, ratings, prices } from './SelectionData';
import { getProductsAction } from '../../actions/getProductsAction';
import { isEmpty, isEqual, isNull } from 'lodash';


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
    if(isEqual(info.name, "selectedCategory"))
      this.setState({ [info.name]: event, selectedBrands: [] });
    else
      this.setState({ [info.name]: event });
  }

  onClickCategoriesApply = () => {
    const { selectedCategory, selectedBrands, selectedPrice, selectedRating } = this.state;
    let custompath = '/';
    custompath += selectedCategory.value;
    custompath += '/';
    if(isNull(selectedPrice))
      custompath += '-';
    else
      custompath += selectedPrice.value;
    custompath += '/';
    if(isEmpty(selectedBrands))
      custompath += '-';
    else
      for(let i = 0; i < selectedBrands.length; i++) {
        custompath += selectedBrands[i].value;
        if(i !== selectedBrands.length - 1)
          custompath += ',';
      }
    custompath += '/';
    if(isNull(selectedRating))
      custompath += '-';
    else
      custompath += selectedRating.value;

    this.props.getProductsAction(custompath);
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
        <Button variant={"success"} onClick={this.onClickCategoriesApply}>
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
    getProductsAction
  }, dispatch);
};


export default connect(null, mapActionToProps)(CatergoriesBox);