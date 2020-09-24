import React from "react";

import "./App.css";
import Header from "./header";
import Banner from "./banner";

function App() {
  return (
    <div className="content">
      <Header />
      <Banner text="to my first page created with react.js" />
    </div>
  );
}
export default App;
