import React from "react";
import styles from "./RemoveOneTaskModal.module.css";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

function RemoveOneTaskModal(props) {
  return (
    <>
      <Modal show={true} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className={styles.warning}>
            Are you sure to remove this task?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={props.removeOneTask}>
            Remove
          </Button>
          <Button
            variant="outline-danger"
            className={styles.cancel}
            onClick={props.handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

RemoveOneTaskModal.propTypes = {
  removeOneTask: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default RemoveOneTaskModal;
