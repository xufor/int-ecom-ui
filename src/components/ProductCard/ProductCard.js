import React, { Component } from 'react';
import { Card, Button, Badge, Popover, Overlay } from 'react-bootstrap';
import { capitalize } from 'lodash';
import { store } from '../../index';
import { ADD_TO_CART } from '../../reducers/cartReducer';
import Skeleton from 'react-loading-skeleton';
import './style.css';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescriptionPopover: false,
    };
    this.overlayTarget = React.createRef();
  }

  onClickAddToCart = () => {
    store.dispatch({
      type: ADD_TO_CART,
      payload: this.props.productDetails
    });
  }

  render() {
    const {
      name,
      description,
      price,
      company,
      review,
      image
    } = this.props.productDetails;
    return (
      <Card
        style={{ width: '16rem' }}
        className={"m-2"}
        bg={"light"}
        onMouseEnter={() => this.setState({ showDescriptionPopover: true })}
        onMouseLeave={() => this.setState({ showDescriptionPopover: false })}
        ref={this.overlayTarget}
      >
        {
          image
            ? <Card.Img variant={"top"} src={image} />
            : <Skeleton height={200} />
        }
        <Card.Body>
          <Card.Title>
            {
              name
                ? name
                : <Skeleton />
            }
          </Card.Title>
          <Card.Subtitle>
            {
              company
                ? capitalize(company) + " - "
                : <Skeleton />
            }
            <Badge className={"pcard-rating"} >{review}</Badge>
          </Card.Subtitle>
          <Card.Text>
            {price? '₹' + price : ""}
          </Card.Text>
          <Button
            disabled={name === undefined}
            variant={"success"}
            onClick={this.onClickAddToCart}
          >
            Add to Cart
          </Button>
        </Card.Body>
        <Overlay
          show={this.state.showDescriptionPopover && name !== undefined}
          placement={"right"}
          target={this.overlayTarget}
          container={this.overlayTarget}
          containerPadding={10}
        >
          <Popover>
            <Popover.Title as={"h3"}>Description</Popover.Title>
            <Popover.Content>
              {description}
            </Popover.Content>
          </Popover>
        </Overlay>
      </Card>
    );
  }
}

export default ProductCard;