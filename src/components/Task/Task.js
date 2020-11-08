import React from "react";
import styles from "./task.module.css";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

function Task(props) {
  return (
    <Card className={styles.card}>
      <Card.Body>
        <input type="checkbox" />
        <Card.Text className={styles.task}>{props.newTask.text}</Card.Text>
        <Button className={styles.cardButton} variant="warning">
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button
          variant="danger"
          className={styles.cardButton}
          onClick={() => props.removeTask(props.newTask._id)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Task;
