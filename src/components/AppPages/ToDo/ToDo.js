import React, { PureComponent } from "react";
import Task from "./Task/Task";
import styles from "./ToDo.module.css";
import InputTask from "./InputTask/InputTask";
import { Button, Container, Row, Col } from "react-bootstrap";
import Confirm from "./Confirm/Confirm";
import EditTaskModal from "./EditTaskModal/EditTaskModal";
import Search from "./../../Search/Search";
import RemoveSelectedModal from "./RemoveSelectedModal/RemoveSelectedModal";
import { connect } from "react-redux";
import {
  getTasks,
  inputTask,
  saveTask,
  removeAll,
  removeSelected,
} from "./../../../store/actions";

class ToDo extends PureComponent {
  state = {
    title: "",
    description: "",
    date: new Date(),
    selectedTasks: new Set(),
    editTask: null,
    showConfirm: false,
    removeAllConfirm: false,
    removeSelected: false,
    newTaskModal: false,
  };

  componentDidMount() {
    this.props.getTasks();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
      this.toggleAddTaskModal();
    }
  }

  handleDate = (date) => {
    this.setState({
      date,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { title, description, date } = this.state;
    if (!title) {
      return;
    }
    const task = {
      title,
      description,
      date: date.toISOString().slice(0, 10),
    };
    this.props.inputTask(task);
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleClick();
    }
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
    const body = {
      tasks: [...this.state.selectedTasks],
    };

    this.setState({
      selectedTasks: new Set(),
      removeSelected: false,
    });
    this.props.removeSelected(body);
  };

  removeAll = () => {
    const body = {
      tasks: this.props.tasks.map((el) => el._id),
    };
    this.props.removeAll(body);
    this.setState({
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

  toggleAddTaskModal = () => {
    this.setState({
      newTaskModal: !this.state.newTaskModal,
    });
  };

  onSave = (editedTask) => {
    this.props.saveTask(editedTask);
    this.setState({
      editTask: null,
      title: "",
      description: "",
    });
  };

  render() {
    const {
      title,
      description,
      date,
      selectedTasks,
      removeAllConfirm,
      removeSelected,
      editTask,
      newTaskModal,
    } = this.state;
    const { tasks } = this.props;
    const newTaskList = tasks.map((el, i) => {
      return (
        <Col key={el._id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Task
            newTask={el}
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
            <Search />
            <Row className="justify-content-center text-center">
              <Col lg={6} xs={12} sm={10} md={8}>
                <Button
                  className={styles.addButton}
                  onClick={this.toggleAddTaskModal}
                  disabled={!!selectedTasks.size}>
                  Add Task
                </Button>
              </Col>
            </Row>
            <Row>{newTaskList}</Row>
            <Row className="justify-content-center">
              <Col xs={2} className="mt-3">
                {!!tasks.length && (
                  <Button
                    variant="outline-danger"
                    onClick={this.openConfirmSelected}
                    disabled={!selectedTasks.size}>
                    Remove Selected
                  </Button>
                )}
              </Col>
              <Col xs={2} className="mt-3">
                {!!tasks.length && (
                  <Button
                    variant="outline-danger"
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
        {newTaskModal && (
          <InputTask
            onClose={this.toggleAddTaskModal}
            title={title}
            description={description}
            creationDate={date}
            handleClick={this.handleClick}
            handleChange={this.handleChange}
            handleKeyDown={this.handleKeyDown}
            handleDate={this.handleDate}
          />
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    addTaskSuccess: state.addTaskSuccess,
  };
};
const mapDispatchToProps = {
  getTasks,
  inputTask,
  saveTask,
  removeAll,
  removeSelected,
};
export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
