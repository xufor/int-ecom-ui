import React, { Component } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

class ProductCard extends Component {
  render() {
    return (
      <Card style={{ width: '16rem' }} className={"m-2"}>
        <Card.Img variant={"top"} src={"assets/images/sample.png"} />
        <Card.Body>
          <Card.Title>
            Card Title
          <Badge className={"bg-warning p-2 ml-2"} >5</Badge>
          </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Button variant={"primary"}>Add to Cart</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default ProductCard;