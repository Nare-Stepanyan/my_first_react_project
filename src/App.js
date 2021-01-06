import React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import ToDo from "./components/AppPages/ToDo/ToDo";
import About from "./components/AppPages/About/About";
import Contact from "./components/AppPages/Contact/Contact";
import NotFound from "./components/AppPages/NotFound/NotFound";
import OneTask from "./components/AppPages/OneTask/OneTask";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import Spinner from "./components/Spinner/Spinner";

function App(props) {
  const { errorMessage, loading, successMessage } = props;
  if (errorMessage) {
    toast.error(errorMessage);
  }
  if (successMessage) {
    toast.success(successMessage);
  }
  return (
    <div className="wrapper">
      <Header />
      <Switch>
        <Route path="/" exact component={ToDo} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/task" exact component={ToDo} />
        <Route path="/task/:id" exact component={OneTask} />
        <Route path="/404" exact component={NotFound} />
        <Redirect to="/404" />
      </Switch>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loading && <Spinner />}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage,
    loading: state.loading,
    successMessage: state.successMessage,
  };
};

export default connect(mapStateToProps)(App);
