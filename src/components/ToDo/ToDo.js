import React, { Component } from "react";
import Task from "../Task/Task";
import styles from "./ToDo.module.css";
import idGenerator from "./../../helpers/idGenerator";
import {
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";

class ToDo extends Component {
  state = {
    tasks: [],
    inputValue: "",
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
  render() {
    const { inputValue } = this.state;
    const { tasks } = this.state;
    const newTaskList = tasks.map((el, i) => {
      return (
        <Col key={el._id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Task newTask={el} removeTask={this.removeTask} />
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
                <InputGroup>
                  <FormControl
                    placeholder="Input your new task"
                    aria-label="Input your new task"
                    aria-describedby="basic-addon2"
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    value={inputValue}
                    type="text"
                  />
                  <InputGroup.Append>
                    <Button
                      className={styles.addButton}
                      onClick={this.handleClick}
                      disabled={!inputValue}>
                      Add Task
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Row>
            <Row>{newTaskList}</Row>
          </Container>
        </div>
      </>
    );
  }
}

export default ToDo;
