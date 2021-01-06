import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
//import Spinner from "./../../Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import EditTaskModal from "../ToDo/EditTaskModal/EditTaskModal";
import styles from "./OneTask.module.css";
import { formatDate } from "./../../../helpers/utils";
import { connect } from "react-redux";
import {
  openOneTask,
  removeOneTask,
  saveOneTask,
} from "./../../../store/actions";

function OneTask(props) {
  let [openEditModal, setModal] = useState(false);
  let [task, setTask] = useState(null);

  useEffect(() => {
    const taskId = props.match.params.id;
    props.openOneTask(taskId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.editOneTaskSuccess) {
      props.openOneTask(props.task._id);
      toggleEditModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.editOneTaskSuccess]);

  useEffect(() => {
    setTask(props.task);
  }, [props.task]);

  function toggleEditModal() {
    setModal(!openEditModal);
  }

  function onRemove() {
    const id = task._id;
    const path = props.history.push;
    props.removeOneTask(id, path);
  }

  function saveTask(editedTask) {
    props.saveOneTask(editedTask);
  }

  return (
    <>
      {!!task ? (
        <Card className="text-center">
          <Card.Header>{`Status: ${task.status}`}</Card.Header>
          <Card.Body>
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>{!!task.description && task.description}</Card.Text>
            <Card.Text className={styles.date}>
              Date: {formatDate(task.date)}
            </Card.Text>
            <div className={styles.buttons}>
              <Button
                variant="danger"
                // className={styles.cardButton}
                onClick={onRemove}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
              <Button
                //className={styles.cardButton}
                variant="warning"
                onClick={toggleEditModal}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </div>
          </Card.Body>
          <Card.Footer className={styles.date}>
            Created at: {formatDate(task.created_at)}
          </Card.Footer>
        </Card>
      ) : (
        <div>Task is not found</div>
      )}

      {openEditModal && (
        <EditTaskModal
          task={task}
          onClose={toggleEditModal}
          onSave={saveTask}
        />
      )}
    </>
  );
}

const mapStatetoProps = (state) => {
  return {
    task: state.task,
    successMessage: state.successMessage,
    editOneTaskSuccess: state.editOneTaskSuccess,
  };
};
const mapDispatchToProps = {
  openOneTask,
  removeOneTask,
  saveOneTask,
};

export default connect(mapStatetoProps, mapDispatchToProps)(OneTask);
