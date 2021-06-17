import React, { Component } from 'react';
import { Row, Container, Table, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty, isNull, join } from 'lodash';
import { withRouter } from 'react-router';
import { getOrderHistoryAction } from '../../actions/getOrderHistoryAction';

class HistoryPage extends Component {
  componentDidMount() {
    if(!this.props.isLoggedIn)
      this.props.history.push('/');
    else
      this.props.getOrderHistoryAction();
  }

  componentDidUpdate() {
    if(!this.props.isLoggedIn)
      this.props.history.push('/');
  }

  showOrderHistory = () => {
    const { orderHistory } = this.props;
    if (isEmpty(orderHistory)) {
      return (
        <Row className={"justify-content-center"}>
          <Image src={"assets/images/no-history.jpg"} width={400} height={725} fluid />
        </Row>
      );
    }
    else {
      let index = 1;
      let cartRows = orderHistory.map((order) => (
        <tr key={order.id}>
          <td>{index++}</td>
          <td>{order.id}</td>
          <td>{new Date(order.dop).toLocaleDateString()}</td>
          <td>{join(order.products.map((item) => item.name + "(" + item.quantity + ")"), ", ")}</td>
          <td>₹{order.total}</td>
        </tr>
      ));

      return (
        <React.Fragment>
          <h2 className={"mt-4 mb-3"}>Order History</h2>
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Order Id</th>
                <th>Order Date</th>
                <th>Items</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartRows}
            </tbody>
          </Table>
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
        {this.showOrderHistory()}
      </Container>
    );
  }
}

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    getOrderHistoryAction
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !isNull(state.jwt),
    orderHistory: state.orderHistory
  }
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(HistoryPage));