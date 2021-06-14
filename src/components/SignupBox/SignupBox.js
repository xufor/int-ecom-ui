import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { store } from '../../index';
import { signupAction } from '../../actions/signupAction';

export const invertShowSignupModal = () => {
  const { modalStatus } = store.getState();
  store.dispatch({
    type: 'SET_MODAL_STATUS',
    payload: { ...modalStatus, signup: !modalStatus.signup }
  });
}

class SignupBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupUsername: "",
      signupPassword: "",
      signupEmail: "",
      signupName: "",
      signupDob: ""
    };
  }

  onSignupInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  onClickSignup = () => {
    const { signupUsername, signupPassword, signupName, signupEmail, signupDob } = this.state;
    this.props.signupAction(
      signupUsername,
      signupPassword,
      signupName,
      signupEmail,
      signupDob
    );
  }

  signupErrorMaker = () => {
    if (this.props.signupError === null)
      return null;
    return (
      <React.Fragment>
        <Form.Label className={"text-danger"}>
          {this.props.signupError}
        </Form.Label>
        <br />
      </React.Fragment>
    );
  }

  signupModalMaker = () => {
    const signupInputs = (
      <Form>
        <Form.Group controlId={"signupUsername"}>
          {this.signupErrorMaker()}
          <Form.Label>Username</Form.Label>
          <Form.Control type={"text"}
            onChange={this.onSignupInputChange}
            value={this.state.signupUsername}
            placeholder={"Enter Username"}
          />
        </Form.Group>
        <Form.Group controlId={"signupPassword"}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={"password"}
            value={this.state.signupPassword}
            onChange={this.onSignupInputChange}
            placeholder={"Enter Password"}
          />
        </Form.Group>
        <Form.Group controlId={"signupEmail"}>
          <Form.Label>Email</Form.Label>
          <Form.Control type={"email"}
            onChange={this.onSignupInputChange}
            value={this.state.signupEmail}
            placeholder={"Enter Email"}
          />
        </Form.Group>
        <Form.Group controlId={"signupName"}>
          <Form.Label>Name</Form.Label>
          <Form.Control type={"text"}
            onChange={this.onSignupInputChange}
            value={this.state.signupName}
            placeholder={"Enter Name"}
          />
        </Form.Group>
        <Form.Group controlId={"signupDob"}>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type={"date"}
            onChange={this.onSignupInputChange}
            value={this.state.signupDob}
            placeholder={"Enter Name"}
          />
        </Form.Group>
      </Form>
    );

    return (
      <Modal
        show={this.props.modalStatus.signup}
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>{signupInputs}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.onClickSignup}>
            Signup
          </Button>
          <Button variant="secondary" onClick={invertShowSignupModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    return this.signupModalMaker();
  }
}

const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    signupAction,
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    modalStatus: state.modalStatus,
    signupError: state.signupError
  }
};

export default connect(mapStateToProps, mapActionToProps)(SignupBox);