import request from "./../helpers/request";

export function getTasks() {
  return (dispatch) => {
    const url = "http://localhost:3001/task";
    request(url)
      .then((res) => {
        dispatch({ type: "GET_TASKS_SUCCESS", tasks: res });
      })
      .catch((err) => {
        dispatch({ type: "GET_TASKS_FAILURE", error: err.message });
      });
  };
}
