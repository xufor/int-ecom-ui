import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import { store } from '../../index';

export const invertShowProfileModal = () => {
  const { modalStatus } = store.getState();
  store.dispatch({
    type: 'SET_MODAL_STATUS',
    payload: { ...modalStatus, profile: !modalStatus.profile }
  });
}

class ProfileBox extends Component {
  profileModalMaker = () => {
    const { email, dob, name } = this.props.profile;
    return (
      <Modal
        show={this.props.modalStatus.profile}
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{name ? "Name: " + name : <Skeleton />}</p>
          <p>{name ? "Email: " + email : <Skeleton />}</p>
          <p>{name ? "Date of Birth: " + new Date(dob).toLocaleDateString() : <Skeleton />}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"secondary"} onClick={invertShowProfileModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    return this.profileModalMaker();
  }
}

const mapStateToProps = (state) => {
  return {
    modalStatus: state.modalStatus,
    profile: state.profile
  }
};

export default connect(mapStateToProps, null)(ProfileBox);