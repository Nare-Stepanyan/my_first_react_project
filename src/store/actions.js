import request from "./../helpers/request";
import * as actionTypes from "./actionTypes";

export function getTasks() {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    const url = "http://localhost:3001/task";
    request(url)
      .then((res) => {
        dispatch({ type: actionTypes.GET_TASKS_SUCCESS, tasks: res });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function inputTask(body) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    const url = "http://localhost:3001/task";
    request(url, "POST", body)
      .then((res) => {
        dispatch({ type: actionTypes.ADD_TASK_SUCCESS, task: res });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function removeTask(id) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    const url = `http://localhost:3001/task/${id}`;
    request(url, "DELETE")
      .then((res) => {
        dispatch({ type: actionTypes.DELETE_TASK_SUCCESS, id });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function saveTask(editedTask) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    const url = `http://localhost:3001/task/${editedTask._id}`;
    request(url, "PUT", editedTask)
      .then((res) => {
        dispatch({
          type: actionTypes.SAVE_EDITED_TASK_SUCCESS,
          editedTask: res,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function removeAll(body) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    const url = "http://localhost:3001/task";
    request(url, "PATCH", body)
      .then((res) => {
        dispatch({
          type: actionTypes.REMOVE_ALL_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}
export function removeSelected(selectedTasks) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    const url = "http://localhost:3001/task";
    request(url, "PATCH", selectedTasks)
      .then((res) => {
        dispatch({
          type: actionTypes.REMOVE_SELECTED_SUCCESS,
          selectedTasks,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}
