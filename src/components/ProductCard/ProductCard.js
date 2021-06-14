import React, { Component } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

class ProductCard extends Component {
  render() {
    return (
      <Card style={{ width: '16rem' }} className={"m-2"}>
        <Card.Img variant={"top"} src={"assets/images/sample.png"} />
        <Card.Body>
          <Card.Title>
            5Star
            <Badge className={"bg-warning p-2 ml-2"} >5</Badge>
          </Card.Title>
          <Card.Text>Cadburry - ₹50</Card.Text>
          <Card.Text>
            Jo Khaye Kho Jaye
          </Card.Text>
          <Button variant={"primary"}>Add to Cart</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default ProductCard;