import React from "react";
import styles from "./Confirm.module.css";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

function Confirm(props) {
  return (
    <>
      <Modal show={true} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className={styles.warning}>
            Are you sure to remove all tasks?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="danger"
            className={styles.confirm}
            onClick={props.removeAll}>
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

Confirm.propTypes = {
  removeAll: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Confirm;
