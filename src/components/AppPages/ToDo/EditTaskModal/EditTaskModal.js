import React, { PureComponent, createRef } from "react";
import styles from "./EditTaskModal.module.css";
import { Button, FormControl, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditTaskModal extends PureComponent {
  constructor(props) {
    super(props);
    const { date } = props.task;
    this.state = {
      ...props.task,
      date: date ? new Date(date) : new Date(),
    };
    this.titleRef = createRef();
  }
  componentDidMount() {
    this.titleRef.current.focus();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleDate = (date) => {
    this.setState({
      date,
    });
  };

  saveModal = () => {
    const { title, date } = this.state;
    if (!title) {
      return;
    }
    const editedTask = {
      ...this.state,
      date: date.toISOString().slice(0, 10),
    };
    this.props.onSave(editedTask);
  };
  render() {
    const { props } = this;
    const { title, description, date } = this.state;
    return (
      <>
        <Modal show={true} onHide={props.onClose} centered>
          <Modal.Header closeButton>
            {/* <Modal.Title className={styles.title}>Edit Task</Modal.Title> */}
            <Modal.Title className={styles.title}>Edit Job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              placeholder="Title"
              name="title"
              value={title}
              ref={this.titleRef}
              onChange={this.handleChange}
              onKeyDown={props.handleKeyDown}
              title={title}
              type="text"
            />
            <textarea
              rows="4"
              placeholder="Description"
              name="description"
              value={description}
              description={description}
              onChange={this.handleChange}
              className={styles.description}></textarea>
            <DatePicker
              selected={date}
              onChange={this.handleDate}
              minDate={new Date()}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="custom"
              className={styles.saveBtn}
              onClick={this.saveModal}>
              Save Changes
            </Button>
            <Button
              variant="custom"
              className={styles.cancelBtn}
              onClick={props.onClose}>
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
