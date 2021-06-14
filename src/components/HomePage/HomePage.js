import React, { Component } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import ProductCard from '../ProductCard/ProductCard';

class HomePage extends Component {
  makeCards = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((element) => {
      return <Col key={element}><ProductCard /></Col>;
    });
  }

  render() {
    return (
      <Container
        fluid={"md"}
        className={"pt-2 min-vh-100 bg-light border-left border-right"}
      >
        <Row xl={4} lg={3} sm={2} noGutters className={"m-0"}>
          {this.makeCards()}
        </Row>
      </Container>
    );
  }
}

export default HomePage;