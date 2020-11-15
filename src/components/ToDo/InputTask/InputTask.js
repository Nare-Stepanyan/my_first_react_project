import React from "react";
import styles from "./InputTask.module.css";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";

function InputTask(props) {
  return (
    <>
      <InputGroup>
        <FormControl
          placeholder="Input your new task"
          aria-label="Input your new task"
          aria-describedby="basic-addon2"
          onChange={props.handleChange}
          onKeyDown={props.handleKeyDown}
          value={props.inputValue}
          type="text"
          disabled={!!props.selectedTasks.size}
        />
        <InputGroup.Append>
          <Button
            className={styles.addButton}
            onClick={props.handleClick}
            disabled={!!props.selectedTasks.size}>
            Add Task
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
}

InputTask.propTypes = {
  inputValue: PropTypes.string.isRequired,
  selectedTasks: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
};
export default InputTask;
