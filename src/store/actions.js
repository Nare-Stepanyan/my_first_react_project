import request from "./../helpers/request";
import * as actionTypes from "./actionTypes";

const apiUrl = process.env.REACT_APP_API_URL;

export function getTasks(data = {}) {
  const url = `${apiUrl}/task`;

  let query = "?";

  for (let key in data) {
    let value = data[key];
    query = `${query}${key}=${value}&`;
  }

  if (query === "?") {
    query = "";
  }

  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    request(url + query)
      .then((res) => {
        dispatch({ type: actionTypes.GET_TASKS_SUCCESS, tasks: res });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function inputTask(body) {
  console.log(body);
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    const url = `${apiUrl}/task`;
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
    const url = `${apiUrl}/task/${id}`;
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
    const url = `${apiUrl}/task/${editedTask._id}`;
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

export function changeStatus(id, status, from) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    const url = `${apiUrl}/task/${id}`;
    request(url, "PUT", status)
      .then((res) => {
        dispatch({
          type: actionTypes.CHANGE_STATUS_SUCCESS,
          task: res,
          from,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function saveOneTask(editedTask) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    const url = `${apiUrl}/task/${editedTask._id}`;
    request(url, "PUT", editedTask)
      .then((res) => {
        dispatch({
          type: actionTypes.SAVE_ONE_TASK_SUCCESS,
          task: res,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function openOneTask(taskId) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    const url = `${apiUrl}/task/${taskId}`;
    request(url)
      .then((res) => {
        dispatch({
          type: actionTypes.OPEN_ONE_TASK_SUCCESS,
          task: res,
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
    const url = `${apiUrl}/task`;
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
    const url = `${apiUrl}/task`;
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

export function removeOneTask(id, path) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    const url = `${apiUrl}/task/${id}`;
    request(url, "DELETE")
      .then((res) => {
        dispatch({
          type: actionTypes.REMOVE_ONE_TASK_SUCCESS,
        });
        path("./");
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function sendFormMessage(body) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    const url = `${apiUrl}/form`;
    request(url, "POST", body)
      .then((res) => {
        dispatch({
          type: actionTypes.SEND_FORM_MESSAGE_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.ERROR,
          error: "🖊 Try again, something was not written correctly! ",
        });
      });
  };
}
