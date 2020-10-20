import React, { Component } from "react";

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
    return this.setState({
      tasks: [...this.state.tasks, this.state.inputValue],
      inputValue: "",
    });
  };
  render() {
    const { inputValue } = this.state;
    const { tasks } = this.state;
    const tasksArr = tasks.map((el, i) => {
      return <p key={i}>{el}</p>;
    });
    return (
      <>
        {tasksArr}
        <div className="add_tasks">
          <input
            value={inputValue}
            type="text"
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
