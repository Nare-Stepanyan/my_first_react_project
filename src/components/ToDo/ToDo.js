import React, { PureComponent } from "react";
import Task from "./Task/Task";
import styles from "./ToDo.module.css";
import idGenerator from "./../../helpers/idGenerator";
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
  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };
  handleClick = () => {
    if (!this.state.inputValue) {
      return;
    }
    const newTask = {
      text: this.state.inputValue,
      _id: idGenerator(),
    };
    this.setState({
      tasks: [newTask, ...this.state.tasks],
      inputValue: "",
    });
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleClick();
    }
  };
  removeTask = (id) => {
    const newTasks = this.state.tasks.filter((task) => task._id !== id);
    this.setState({
      tasks: newTasks,
    });
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
    let tasks = [...this.state.tasks];
    this.state.selectedTasks.forEach((id) => {
      tasks = tasks.filter((task) => task._id !== id);
    });
    this.setState({
      tasks,
      selectedTasks: new Set(),
      removeSelected: false,
    });
  };
  removeAll = () => {
    this.setState({
      tasks: [],
      removeAllConfirm: false,
    });
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
            onSave={(task) => console.log("task", task)}
            onClose={() => this.toggleEdit(null)}
          />
        )}
      </>
    );
  }
}

export default ToDo;
