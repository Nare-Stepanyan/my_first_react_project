import React from "react";
import styles from "./RemoveSelectedModal.module.css";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

function RemoveSelectedModal(props) {
  return (
    <>
      <Modal show={true} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          {/* <Modal.Title className={styles.warning}>
            Are you sure to remove
            {props.count > 1
              ? ` ${props.count}  tasks?`
              : ` ${props.count} task?`}
          </Modal.Title> */}
          <Modal.Title className={styles.warning}>
            Are you sure to remove
            {props.count > 1
              ? ` ${props.count}  jobs?`
              : ` ${props.count} job?`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={props.removeSelected}>
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

RemoveSelectedModal.propTypes = {
  count: PropTypes.number,
  removeSelected: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default RemoveSelectedModal;
