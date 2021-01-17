import React, { useRef, useEffect } from "react";
import styles from "./InputTask.module.css";
import { Button, FormControl, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InputTask(props) {
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);
  return (
    <Modal show={true} onHide={props.onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles.taskTitle}>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          placeholder="Title"
          name="title"
          ref={titleRef}
          onChange={props.handleChange}
          onKeyDown={props.handleKeyDown}
          title={props.title}
          type="text"
        />
        <textarea
          rows="4"
          placeholder="Description"
          name="description"
          description={props.description}
          onChange={props.handleChange}
          className={styles.description}></textarea>
        <DatePicker
          selected={props.creationDate}
          onChange={props.handleDate}
          minDate={new Date()}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="custom"
          className={styles.add}
          style={{ outline: "none" }}
          onClick={props.handleClick}>
          Add
        </Button>
        <Button
          variant="custom"
          className={styles.cancel}
          onClick={props.onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

InputTask.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  handleDate: PropTypes.func.isRequired,
  creationDate: PropTypes.object.isRequired,
};

export default InputTask;
