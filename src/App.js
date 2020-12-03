import React from "react";
import "./App.css";
<<<<<<< HEAD
import Header from "./header";
import Banner from "./banner";
import MainText from "./content";

function App() {
  return (
    <div className="content">
      <Header />
      <Banner text="to my first page created with react.js" />
      <MainText />
    </div>
  );
}
=======
import ToDo from "./components/ToDo/ToDo";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="wrapper">
      <ToDo />
    </div>
  );
}

>>>>>>> b3a5edd63dabd33ed4436cfa0dad39aa6e5ceb11
export default App;
