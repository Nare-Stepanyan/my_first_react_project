import React, { PureComponent } from "react";
import styles from "./EditTaskModal.module.css";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

class EditTaskModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...props.task,
    };
  }
  handleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };
  saveModal = () => {
    const { title } = this.state;
    if (!title) {
      return;
    }
    this.props.onSave(this.state);
  };
  render() {
    const { props } = this;
    const { title } = this.state;
    return (
      <>
        <Modal show={true} onHide={props.onClose} centered>
          <Modal.Header closeButton>
            <Modal.Title> Edit your task </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              className={styles.inputModal}
              value={title}
              onChange={this.handleChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.saveModal}>
              Save
            </Button>
            <Button variant="secondary" onClick={props.onClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

EditTaskModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};
export default EditTaskModal;
