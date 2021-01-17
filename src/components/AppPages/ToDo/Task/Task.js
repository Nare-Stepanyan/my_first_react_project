import React, { PureComponent } from "react";
import styles from "./task.module.css";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheck,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import RemoveOneTaskModal from "../RemoveOneTaskModal/RemoveOneTaskModal";
import { formatDate } from "./../../../../helpers/utils";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeTask, changeStatus } from "./../../../../store/actions";
import { shortenString } from "./../../../../helpers/utils";

class Task extends PureComponent {
  state = {
    checked: false,
    showConfirm: false,
  };

  handleCheck = () => {
    this.setState({
      checked: !this.state.checked,
    });
    this.props.onCheck(this.props.newTask._id);
  };
  openConfirm = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    });
  };

  render() {
    const { newTask, disabled, onEdit } = this.props;
    const { checked, showConfirm } = this.state;
    return (
      <Card className={`${styles.card} ${checked && styles.selected}`}>
        <Card.Body>
          <input type="checkbox" onClick={this.handleCheck} />
          <Card.Title
            style={{ background: newTask.status === "done" ? "#ffb85f" : "" }}
            className={styles.title}>
            <Link to={`/task/${newTask._id}`}>
              {shortenString(newTask.title, 30)}
            </Link>
          </Card.Title>
          <Card.Text className={styles.task}>
            {!!newTask.description && shortenString(newTask.description, 60)}
          </Card.Text>
          <Card.Text className={styles.status}>
            Status: <span>{newTask.status}</span>
          </Card.Text>
          <Card.Text className={styles.date}>
            Created at: {formatDate(newTask.created_at)}
          </Card.Text>
          <Card.Text className={styles.deadline}>
            Deadline: {formatDate(newTask.date)}
          </Card.Text>
          <div className={styles.buttons}>
            {newTask.status === "active" ? (
              <Button
                variant="custom"
                className={styles.doneBtn}
                disabled={disabled}
                onClick={() =>
                  this.props.changeStatus(
                    newTask._id,
                    { status: "done" },
                    "tasks"
                  )
                }>
                <FontAwesomeIcon icon={faCheck} />
              </Button>
            ) : (
              <Button
                variant="custom"
                className={styles.activeBtn}
                disabled={disabled}
                onClick={() =>
                  this.props.changeStatus(
                    newTask._id,
                    { status: "active" },
                    "tasks"
                  )
                }>
                <FontAwesomeIcon icon={faHistory} />
              </Button>
            )}
            <Button
              variant="custom"
              className={styles.editBtn}
              disabled={disabled}
              onClick={() => onEdit(newTask)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button
              variant="danger"
              onClick={this.openConfirm}
              disabled={disabled}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </Card.Body>

        {showConfirm && (
          <RemoveOneTaskModal
            removeOneTask={() => this.props.removeTask(newTask._id)}
            handleClose={this.openConfirm}
          />
        )}
      </Card>
    );
  }
}

Task.propTypes = {
  newTask: PropTypes.object.isRequired,
  onCheck: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  removeTask,
  changeStatus,
};
export default connect(null, mapDispatchToProps)(Task);
