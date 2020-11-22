import React, { PureComponent } from "react";
import Task from "./Task/Task";
import styles from "./ToDo.module.css";
import InputTask from "./InputTask/InputTask";
import { Button, Container, Row, Col } from "react-bootstrap";
import Confirm from "./Confirm/Confirm";
import EditTaskModal from "./EditTaskModal/EditTaskModal";
import RemoveSelectedModal from "./RemoveSelectedModal/RemoveSelectedModal";

class ToDo extends PureComponent {
  state = {
    tasks: [],
    inputValue: "",
    selectedTasks: new Set(),
    editTask: null,
    showConfirm: false,
    removeAllConfirm: false,
    removeSelected: false,
  };

  componentDidMount() {
    const url = "http://localhost:3001/task";
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
          tasks: response,
        });
      })
      .catch((error) => {});
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleClick = () => {
    if (!this.state.inputValue) {
      return;
    }
    const task = {
      title: this.state.inputValue,
    };
    const url = "http://localhost:3001/task";
    const body = JSON.stringify(task);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        const newTask = response;
        this.setState({
          tasks: [newTask, ...this.state.tasks],
          inputValue: "",
        });
      })
      .catch((error) => {});
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleClick();
    }
  };

  removeTask = (id) => {
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
        const newTasks = this.state.tasks.filter((task) => task._id !== id);
        this.setState({
          tasks: newTasks,
        });
      })
      .catch((error) => {});
  };

  handleCheck = (id) => {
    const selectedTasks = new Set(this.state.selectedTasks);
    if (selectedTasks.has(id)) {
      selectedTasks.delete(id);
    } else {
      selectedTasks.add(id);
    }
    this.setState({
      selectedTasks,
    });
  };

  removeSelected = () => {
    const url = "http://localhost:3001/task";
    const body = {
      tasks: [...this.state.selectedTasks],
    };
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        let tasks = [...this.state.tasks];
        this.state.selectedTasks.forEach((id) => {
          tasks = tasks.filter((task) => task._id !== id);
        });
        this.setState({
          tasks,
          selectedTasks: new Set(),
          removeSelected: false,
        });
      })
      .catch((error) => {});
  };

  removeAll = () => {
    const url = "http://localhost:3001/task";
    const body = {
      tasks: this.state.tasks.map((el) => el._id),
    };
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        } else {
          this.setState({
            tasks: [],
            removeAllConfirm: false,
          });
        }
      })
      .catch((error) => {});
  };

  openConfirm = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    });
  };

  openConfirmRemoveAll = () => {
    this.setState({
      removeAllConfirm: !this.state.removeAllConfirm,
    });
  };

  openConfirmSelected = () => {
    this.setState({
      removeSelected: !this.state.removeSelected,
    });
  };

  closeRemoveSelectedModal = () => {
    this.setState({
      removeSelected: !this.state.removeSelected,
    });
  };

  toggleEdit = (task) => {
    this.setState({
      editTask: task,
    });
  };

  onSave = (editedTask) => {
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
          const tasks = [...this.state.tasks];
          const editedTaskIndex = this.state.tasks.findIndex(
            (task, i) => task._id === editedTask._id
          );
          tasks[editedTaskIndex] = response;
          this.setState({
            tasks: tasks,
            editTask: null,
          });
        }
      })
      .catch((error) => {});
  };

  render() {
    const {
      inputValue,
      tasks,
      selectedTasks,
      removeAllConfirm,
      removeSelected,
      editTask,
    } = this.state;

    const newTaskList = tasks.map((el, i) => {
      return (
        <Col key={el._id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Task
            newTask={el}
            removeTask={this.removeTask}
            onCheck={this.handleCheck}
            disabled={!!selectedTasks.size}
            onEdit={this.toggleEdit}
          />
        </Col>
      );
    });

    return (
      <>
        <div>
          <Container>
            <Row>
              <Col>
                <h1 className={styles.title}>My Tasks</h1>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={6} xs={12} sm={10} md={8}>
                <InputTask
                  inputValue={inputValue}
                  selectedTasks={selectedTasks}
                  handleClick={this.handleClick}
                  handleChange={this.handleChange}
                  handleKeyDown={this.handleKeyDown}
                />
              </Col>
            </Row>
            <Row>{newTaskList}</Row>
            <Row className="justify-content-center">
              <Col xs={2} className="mt-3">
                {!!tasks.length && (
                  <Button
                    variant="danger"
                    onClick={this.openConfirmSelected}
                    disabled={!selectedTasks.size}>
                    Remove Selected
                  </Button>
                )}
              </Col>
              <Col xs={2} className="mt-3">
                {!!tasks.length && (
                  <Button
                    variant="danger"
                    onClick={this.openConfirmRemoveAll}
                    disabled={selectedTasks.size}>
                    Remove All
                  </Button>
                )}
              </Col>
            </Row>
          </Container>
        </div>
        {removeAllConfirm && (
          <Confirm
            removeAll={this.removeAll}
            handleClose={this.openConfirmRemoveAll}
          />
        )}

        {removeSelected && (
          <RemoveSelectedModal
            removeSelected={this.removeSelected}
            handleClose={this.closeRemoveSelectedModal}
            count={selectedTasks.size}
          />
        )}

        {!!editTask && (
          <EditTaskModal
            task={editTask}
            onSave={this.onSave}
            onClose={() => this.toggleEdit(null)}
          />
        )}
      </>
    );
  }
}

export default ToDo;
