import React, { PureComponent } from "react";
import { Card, Button } from "react-bootstrap";
import Spinner from "./../../Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import EditTaskModal from "../ToDo/EditTaskModal/EditTaskModal";
import styles from "./OneTask.module.css";
import { formatDate } from "./../../../helpers/utils";

export default class OneTask extends PureComponent {
  state = {
    task: null,
    openEditModal: false,
  };
  componentDidMount() {
    const taskId = this.props.match.params.id;
    const url = `http://localhost:3001/task/${taskId}`;
    fetch(url, {
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
        this.setState({
          task: response,
        });
      })
      .catch((error) => {});
  }

  onRemove = () => {
    const id = this.state.task._id;
    const url = `http://localhost:3001/task/${id}`;
    fetch(url, {
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
        this.props.history.push("/");
      })
      .catch((error) => {});
  };

  toggleEditModal = () => {
    this.setState({
      openEditModal: !this.state.openEditModal,
    });
  };

  saveTask = (editedTask) => {
    const url = `http://localhost:3001/task/${editedTask._id}`;
    const body = JSON.stringify(editedTask);
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.error) {
          throw response.error;
        } else {
          this.setState({
            task: response,
            openEditModal: false,
          });
        }
      })
      .catch((error) => {});
  };

  render() {
    const { task, openEditModal } = this.state;

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
                  onClick={this.onRemove}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
                  //className={styles.cardButton}
                  variant="warning"
                  onClick={this.toggleEditModal}>
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
            onClose={this.toggleEditModal}
            onSave={this.saveTask}
          />
        )}
      </>
    );
  }
}
