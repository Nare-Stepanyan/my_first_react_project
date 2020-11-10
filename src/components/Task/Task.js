import React, { Component } from "react";
import styles from "./task.module.css";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

class Task extends Component {
  state = {
    checked: false,
  };
  handleCheck = () => {
    this.setState({
      checked: !this.state.checked,
    });
    this.props.onCheck(this.props.newTask._id);
  };
  render() {
    const { newTask, disabled } = this.props;
    const { checked } = this.state;
    return (
      <Card className={`${styles.card} ${checked && styles.selected}`}>
        <Card.Body>
          <input type="checkbox" onClick={this.handleCheck} />
          <Card.Text className={styles.task}>{newTask.text}</Card.Text>
          <Button
            className={styles.cardButton}
            variant="warning"
            disabled={disabled}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            variant="danger"
            className={styles.cardButton}
            onClick={() => this.props.removeTask(newTask._id)}
            disabled={disabled}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Task;
