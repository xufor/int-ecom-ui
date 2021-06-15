import React, { Component } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';

import ProductCard from '../ProductCard/ProductCard';
import { getProductsAction } from '../../actions/getProductsAction';

class HomePage extends Component {
  componentDidMount() {
    if (isEmpty(this.props.products))
      this.props.getProductsAction("/-/-/-/-");
  }

  makeCards = () => {
    return this.props.products.map((product) => {
      return <Col key={product.id}><ProductCard productDetails={product} /></Col>;
    });
  }

  render() {
    return (
      <Container
        fluid={"md"}
        className={"pt-2 min-vh-100 border-left border-right"}
      >
        <Row xl={4} lg={3} sm={2} noGutters className={"m-0"}>
          {this.makeCards()}
        </Row>
      </Container>
    );
  }
}

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    getProductsAction
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
};

export default connect(mapStateToProps, mapActionToProps)(HomePage);