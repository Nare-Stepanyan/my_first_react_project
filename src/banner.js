import React from "react";
import "./App.css";

function Banner(props) {
  return (
    <div className="banner">
      <p className="banner_text"> Welcome {props.text}</p>{" "}
    </div>
  );
}

export default Banner;
