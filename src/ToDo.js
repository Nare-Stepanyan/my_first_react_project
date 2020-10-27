import React, { Component } from "react";
import Task from "./Task";

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
      return <Task key={i} newTask={el} />;
    });

    return (
      <>
        {newTaskList}
        <div className="add_tasks">
          <input
            type="text"
            value={inputValue}
            className="add_task_input"
            onChange={this.handleChange}
          />
          <button className="add_task_button" onClick={this.handleClick}>
            Add Task
          </button>
        </div>
      </>
    );
  }
}

export default ToDo;
