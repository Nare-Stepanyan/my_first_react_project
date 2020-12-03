import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "./../../assets/images/toDoLogo.png";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} alt="logo" className={styles.logo} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              to="/"
              activeClassName={styles.activePage}
              className={styles.menuLinks}>
              Home
            </NavLink>
            <NavLink
              to="/about"
              activeClassName={styles.activePage}
              className={styles.menuLinks}>
              About us
            </NavLink>
            <NavLink
              to="/contact"
              activeClassName={styles.activePage}
              className={styles.menuLinks}>
              Contact
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}