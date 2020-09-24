import React from "react";
import "./App.css";

function Header() {
  return (
    <header>
      <div class="company_name">
        {" "}
        <span> Company Name </span>{" "}
      </div>{" "}
      <div className="menu">
        <a href="#"> Home </a> <a href="#"> Service </a>{" "}
        <a href="#"> About us </a> <a href="#"> Contact </a>{" "}
      </div>{" "}
    </header>
  );
}

export default Header;
