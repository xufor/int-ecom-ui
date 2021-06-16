import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { store } from '../../index';
import { signinAction } from '../../actions/signinAction';
import { SET_MODAL_STATUS } from '../../reducers/modalReducer';

export const invertShowSigninModal = () => {
  const { modalStatus } = store.getState();
  store.dispatch({
    type: SET_MODAL_STATUS,
    payload: { ...modalStatus, signin: !modalStatus.signin }
  });
}

class SigninBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signinUsername: "",
      signinPassword: "",
    };
  }

  onSigninInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  onClickSignin = () => {
    this.props.signinAction(this.state.signinUsername, this.state.signinPassword);
  }

  signinErrorMaker = () => {
    if (this.props.signinError === null)
      return null;
    return (
      <React.Fragment>
        <Form.Label className={"text-danger"}>
          {this.props.signinError}
        </Form.Label>
        <br />
      </React.Fragment>
    );
  }

  signinModalMaker = () => {
    const signinInputs = (
      <Form>
        <Form.Group controlId={"signinUsername"}>
          {this.signinErrorMaker()}
          <Form.Label>Username</Form.Label>
          <Form.Control type={"text"}
            onChange={this.onSigninInputChange}
            value={this.state.signinUsername}
            placeholder={"Enter Username"}
          />
        </Form.Group>
        <Form.Group controlId={"signinPassword"}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={"password"}
            value={this.state.signinPassword}
            onChange={this.onSigninInputChange}
            placeholder={"Enter Password"}
          />
        </Form.Group>
      </Form>
    );

    return (
      <Modal
        show={this.props.modalStatus.signin}
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Signin</Modal.Title>
        </Modal.Header>
        <Modal.Body>{signinInputs}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.onClickSignin}>
            Signin
          </Button>
          <Button variant="secondary" onClick={invertShowSigninModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    return this.signinModalMaker();
  }
}

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    signinAction
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    modalStatus: state.modalStatus,
    signinError: state.signinError
  }
};

export default connect(mapStateToProps, mapActionToProps)(SigninBox);