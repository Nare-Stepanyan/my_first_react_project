import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Spinner from "./../../Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import EditTaskModal from "../ToDo/EditTaskModal/EditTaskModal";
import styles from "./OneTask.module.css";
import { formatDate } from "./../../../helpers/utils";

export default function OneTask(props) {
  let [openEditModal, setModal] = useState(false);
  let [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function fetchTask() {
    const taskId = props.match.params.id;
    const url = `http://localhost:3001/task/${taskId}`;
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        openTask(response);
      })
      .catch((error) => {});
  }

  function openTask(res) {
    setTask(res);
  }

  function toggleEditModal() {
    setModal(!openEditModal);
  }

  function onRemove() {
    const id = task._id;
    const url = `http://localhost:3001/task/${id}`;
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        props.history.push("/");
      })
      .catch((error) => {});
  }
  function saveTask(editedTask) {
    const url = `http://localhost:3001/task/${editedTask._id}`;
    const body = JSON.stringify(editedTask);
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        } else {
          openTask(response);
          toggleEditModal();
        }
      })
      .catch((error) => {});
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
        <Spinner />
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
