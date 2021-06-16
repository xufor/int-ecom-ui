import React, { Component } from 'react';
import { Row, Container, Col, Image } from 'react-bootstrap';
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

  showCardsOnBasisOfProductsAvailability = () => {
    if (isEmpty(this.props.products)) {
      return (
        <Row className={"justify-content-center "}>
          <Image src={"assets/images/no-data-found.png"} fluid />
        </Row>
      );
    }
    else {
      return (
        <Row xl={4} lg={3} sm={2} noGutters className={"m-0"}>
          {
            this.props.products.map((product) => (
              <Col key={product.id}>
                <ProductCard productDetails={product} />
              </Col>
            ))
          }
        </Row>
      );
    }
  }

  render() {
    return (
      <Container
        fluid={"md"}
        className={"pt-2 min-vh-100 border-left border-right"}
      >
        {this.showCardsOnBasisOfProductsAvailability()}
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