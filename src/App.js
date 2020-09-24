import React from "react";
import "./App.css";
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
export default App;
