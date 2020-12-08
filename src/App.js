import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import ToDo from "./components/AppPages/ToDo/ToDo";
import About from "./components/AppPages/About/About";
import Contact from "./components/AppPages/Contact/Contact";
import NotFound from "./components/AppPages/NotFound/NotFound";
import OneTask from "./components/AppPages/OneTask/OneTask";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
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
    </div>
  );
}

export default App;
