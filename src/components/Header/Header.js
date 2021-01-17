import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "./../../assets/images/logo.png";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <>
      <Navbar bg="light" expand="lg" className={styles.menu}>
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
              exact
              activeClassName={styles.activePage}
              className={styles.menuLinks}>
              Home
            </NavLink>
            <NavLink
              to="/about"
              exact
              activeClassName={styles.activePage}
              className={styles.menuLinks}>
              About
            </NavLink>
            <NavLink
              to="/contact"
              exact
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
