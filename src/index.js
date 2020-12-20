import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import Counter from "./components/AppPages/Counter/Counter";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

const defaultState = {
  count: 0,
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE_VALUE":
      return {
        count: state.count + action.value,
      };
    case "RESET_VALUE":
      return { count: 0 };

    default:
      return state;
  }
};
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        {/* <App /> */}
        <Counter />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
