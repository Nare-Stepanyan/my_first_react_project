import React, { Component } from "react";
import Task from "../Task/Task";
import styles from "./ToDo.module.css";
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
    this.setState({
      tasks: [...this.state.tasks, this.state.inputValue],
      inputValue: "",
    });
  };
  render() {
    const { inputValue } = this.state;
    const { tasks } = this.state;
    const newTaskList = tasks.map((el, i) => {
      return (
        <Col key={i} lg={3} className={styles.taskColumns}>
          <Task newTask={el} />
        </Col>
      );
    });

    return (
      <>
        <Container>
          <Row className="no-gutters">
            <h1 className={styles.title}>To Do List</h1>
          </Row>
          <Row className="no-gutters">
            <InputGroup>
              <FormControl
                placeholder="Add new task"
                aria-label="Add new task"
                aria-describedby="basic-addon2"
                onChange={this.handleChange}
                value={inputValue}
                type="text"
              />
              <InputGroup.Append>
                <Button variant="dark" onClick={this.handleClick}>
                  Add Task
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Row>
          <Row className="no-gutters">{newTaskList}</Row>
        </Container>
      </>
    );
  }
}

export default ToDo;
