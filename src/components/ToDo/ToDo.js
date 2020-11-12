import React, { PureComponent } from "react";
import Task from "../Task/Task";
import styles from "./ToDo.module.css";
import idGenerator from "./../../helpers/idGenerator";
import InputTask from "./InputTask/InputTask";
import { Button, Container, Row, Col } from "react-bootstrap";

class ToDo extends PureComponent {
  state = {
    tasks: [],
    inputValue: "",
    selectedTasks: new Set(),
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
    });
  };
  removeAll = () => {
    this.setState({
      tasks: [],
    });
  };
  render() {
    const { inputValue, tasks, selectedTasks } = this.state;

    const newTaskList = tasks.map((el, i) => {
      return (
        <Col key={el._id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Task
            newTask={el}
            removeTask={this.removeTask}
            onCheck={this.handleCheck}
            disabled={!!selectedTasks.size}
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
                    onClick={this.removeSelected}
                    disabled={!selectedTasks.size}>
                    Remove Selected
                  </Button>
                )}
              </Col>
              <Col xs={2} className="mt-3">
                {!!tasks.length && (
                  <Button
                    variant="danger"
                    onClick={this.removeAll}
                    disabled={selectedTasks.size}>
                    Remove All
                  </Button>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default ToDo;
