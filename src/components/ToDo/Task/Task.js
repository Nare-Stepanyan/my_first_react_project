import React, { PureComponent } from "react";
import styles from "./task.module.css";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import RemoveOneTaskModal from "../RemoveOneTaskModal/RemoveOneTaskModal";
import { formatDate } from "../../../helpers/utils";

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
          <Card.Title className={styles.title}>{newTask.title}</Card.Title>
          <Card.Text className={styles.task}>
            Description: {newTask.description}
          </Card.Text>
          <Card.Text className={styles.date}>
            Date: {formatDate(newTask.date)}
          </Card.Text>
          <Card.Text className={styles.date}>
            Created at: {formatDate(newTask.created_at)}
          </Card.Text>
          <Button
            className={styles.cardButton}
            variant="warning"
            disabled={disabled}
            onClick={() => onEdit(newTask)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            variant="danger"
            className={styles.cardButton}
            onClick={this.openConfirm}
            disabled={disabled}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
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
  removeTask: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default Task;
