import React, { Component } from "react";
import ChangeCount from "./ChangeCount";
import ShowCount from "./ShowCount";

class Counter extends Component {
  render() {
    return (
      <>
        <ShowCount />
        <ChangeCount />
      </>
    );
  }
}

export default Counter;
