import React from "react";
import { connect } from "react-redux";

function ChangeCount(props) {
  return (
    <>
      <button
        onClick={() => {
          props.onChangeValue(-1);
        }}>
        -1
      </button>
      <button
        onClick={() => {
          props.onChangeValue(-5);
        }}>
        -5
      </button>
      <button
        onClick={() => {
          props.onChangeValue(-10);
        }}>
        -10
      </button>
      <button
        onClick={() => {
          props.onChangeValue(1);
        }}>
        +1
      </button>
      <button
        onClick={() => {
          props.onChangeValue(5);
        }}>
        +5
      </button>
      <button
        onClick={() => {
          props.onChangeValue(10);
        }}>
        +10
      </button>
      <button
        onClick={() => {
          props.onReset();
        }}>
        reset
      </button>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeValue: (val) => {
      dispatch({ type: "CHANGE_VALUE", value: val });
    },
    onReset: () => {
      dispatch({ type: "RESET_VALUE" });
    },
  };
};
export default connect(null, mapDispatchToProps)(ChangeCount);
