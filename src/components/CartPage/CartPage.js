import React, { Component } from 'react';
import { Row, Container, Table, Image, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty, isNull, keys, sum, values } from 'lodash';
import { store } from '../../index';
import { DECREASE_QUANTITY, INCREASE_QUANTITY } from '../../reducers/cartReducer';

class CartPage extends Component {
  increaseQuantity = (event) => {
    store.dispatch({
      type: INCREASE_QUANTITY,
      payload: event.target.id
    });
  }

  decreaseQuantity = (event) => {
    store.dispatch({
      type: DECREASE_QUANTITY,
      payload: event.target.id
    });
  }

  onClickPlaceOrder = () => {
    if(!this.props.isLoggedIn) {
      alert("You must log in first.")
    }
  }

  showItemsInCart = () => {
    if (isEmpty(this.props.cartItems)) {
      return (
        <Row className={"justify-content-center"}>
          <Image src={"assets/images/empty-cart.png"} fluid />
        </Row>
      );
    }
    else {
      let index = 1;
      const { cartItems } = this.props;
      let cartRows = keys(cartItems).map((key) => (
        <tr key={cartItems[key].id}>
          <td>{index++}</td>
          <td>{cartItems[key].name}</td>
          <td>
            <Button
              className={"mr-3"}
              onClick={this.decreaseQuantity}
              variant={"secondary"}
              id={cartItems[key].id}
            >-</Button>
            {cartItems[key].quantity}
            <Button
              className={"ml-3"}
              onClick={this.increaseQuantity}
              variant={"secondary"}
              id={cartItems[key].id}
            >+</Button>
          </td>
          <td>₹{cartItems[key].price}</td>
          <td>₹{cartItems[key].quantity * cartItems[key].price}</td>
        </tr>
      ));

      return (
        <React.Fragment>
          <h2 className={"mt-4"}>Cart</h2>
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartRows}
              <tr>
                <td colSpan={4}><strong>Grand Total:</strong></td>
                <td>
                  ₹{sum(values(cartItems).map((e) => (e.price * e.quantity)))}
                </td>
              </tr>
            </tbody>
          </Table>
          <Button variant={"success"} onClick={this.onClickPlaceOrder}>
            Place Order
          </Button>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <Container
        fluid={"md"}
        className={"pt-2 min-vh-100 border-left border-right"}
      >
        {this.showItemsInCart()}
      </Container>
    );
  }
}

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
    isLoggedIn: !isNull(state.jwt)
  }
};

export default connect(mapStateToProps, mapActionToProps)(CartPage);