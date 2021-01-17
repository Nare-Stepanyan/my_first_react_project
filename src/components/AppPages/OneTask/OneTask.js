import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
//import Spinner from "./../../Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheck,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import EditTaskModal from "../ToDo/EditTaskModal/EditTaskModal";
import styles from "./OneTask.module.css";
import { formatDate } from "./../../../helpers/utils";
import { connect } from "react-redux";
import {
  openOneTask,
  removeOneTask,
  saveOneTask,
  changeStatus,
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
        <Card className={`${styles.card} text-center`}>
          <Card.Header
            style={{
              background: task.status === "done" ? "#d5a465" : "#11b5d7",
            }}>
            <Card.Title className={styles.title}>{task.title}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text className={styles.description}>
              {!!task.description && task.description}
            </Card.Text>
            <Card.Text
              className={styles.status}
              style={{
                background: task.status === "done" ? "#d5a465" : "#11b5d7",
              }}>
              {`Status: ${task.status}`}
            </Card.Text>
            <Card.Text className={styles.dateCreated}>
              Created at: {formatDate(task.created_at)}
            </Card.Text>
            <div className={styles.buttons}>
              {task.status === "active" ? (
                <Button
                  variant="custom"
                  className={styles.doneBtn}
                  onClick={() =>
                    props.changeStatus(task._id, { status: "done" }, "single")
                  }>
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
              ) : (
                <Button
                  variant="custom"
                  className={styles.activeBtn}
                  onClick={() =>
                    props.changeStatus(task._id, { status: "active" }, "single")
                  }>
                  <FontAwesomeIcon icon={faHistory} />
                </Button>
              )}

              <Button
                className={styles.editBtn}
                variant="custom"
                onClick={toggleEditModal}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button variant="danger" onClick={onRemove}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </Card.Body>
          <Card.Footer className={styles.dateDeadline}>
            Deadline: {formatDate(task.date)}
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
  changeStatus,
};

export default connect(mapStatetoProps, mapDispatchToProps)(OneTask);
