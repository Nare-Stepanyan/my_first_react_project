import React from "react";
import styles from "./task.module.css";

function Task(props) {
  return <p className={styles.task}>{props.newTask}</p>;
}
export default Task;
