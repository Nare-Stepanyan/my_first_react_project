//import { faSleigh } from "@fortawesome/free-solid-svg-icons";
import * as actionTypes from "./actionTypes";

const defaultState = {
  tasks: [],
  errorMessage: null,
  successMessage: null,
  addTaskSuccess: false,
  editOneTaskSuccess: false,
  loading: false,
  task: null,
};
export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ERROR:
      return {
        ...state,
        errorMessage: action.error,
        loading: false,
      };
    case actionTypes.LOADING:
      return {
        ...state,
        loading: true,
        successMessage: null,
        errorMessage: null,
        addTaskSuccess: false,
        editOneTaskSuccess: false,
      };
    case actionTypes.GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
        loading: false,
      };
    case actionTypes.ADD_TASK_SUCCESS:
      const tasks = [...state.tasks, action.task];
      return {
        ...state,
        tasks: tasks,
        loading: false,
        successMessage: "Task added successfully!!!",
        addTaskSuccess: true,
      };
    case actionTypes.DELETE_TASK_SUCCESS: {
      const newTasks = state.tasks.filter((task) => task._id !== action.id);
      return {
        ...state,
        tasks: newTasks,
        loading: false,
        successMessage: "Task deleted successfully!!!",
      };
    }
    case actionTypes.SAVE_EDITED_TASK_SUCCESS: {
      const tasks = [...state.tasks];
      const editedTaskIndex = state.tasks.findIndex(
        (task, i) => task._id === action.editedTask._id
      );
      tasks[editedTaskIndex] = action.editedTask;
      return {
        ...state,
        tasks: tasks,
        loading: false,
        successMessage: "Task edited successfully!!!",
      };
    }
    case actionTypes.CHANGE_STATUS_SUCCESS: {
      let message;
      if (action.task.status === "done") {
        message = "Congratulations, task completed!!!";
      } else message = "Task is active now!";
      if (action.from === "single") {
        return {
          ...state,
          task: action.task,
          loading: false,
          successMessage: message,
        };
      } else {
        const tasks = [...state.tasks];
        const changedStatusTask = state.tasks.findIndex(
          (task, i) => task._id === action.task._id
        );
        tasks[changedStatusTask] = action.task;

        return {
          ...state,
          tasks: tasks,
          loading: false,
          successMessage: message,
        };
      }
    }

    case actionTypes.REMOVE_ALL_SUCCESS: {
      return {
        ...state,
        tasks: [],
        loading: false,
        successMessage: "All tasks deleted successfully!!!",
      };
    }
    case actionTypes.REMOVE_SELECTED_SUCCESS: {
      let tasks = [...state.tasks];
      action.selectedTasks.tasks.forEach((id) => {
        tasks = tasks.filter((task) => task._id !== id);
      });
      return {
        ...state,
        tasks,
        loading: false,
        successMessage: "Selected tasks deleted successfully!!!",
      };
    }
    case actionTypes.OPEN_ONE_TASK_SUCCESS: {
      const task = action.task;
      return {
        ...state,
        task,
        loading: false,
      };
    }
    case actionTypes.REMOVE_ONE_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case actionTypes.SAVE_ONE_TASK_SUCCESS: {
      const task = action.task;
      return {
        ...state,
        task,
        editOneTaskSuccess: true,
        loading: false,
        successMessage: "Task edited successfully!!!",
      };
    }

    default:
      return state;
  }
};
