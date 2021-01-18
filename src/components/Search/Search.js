import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./Search.module.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import { connect } from "react-redux";
import { getTasks } from "./../../store/actions";

const statusOptions = [
  {
    label: "Reset",
    value: "",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Done",
    value: "done",
  },
];

const sortOptions = [
  {
    label: "Reset",
    value: "",
  },
  {
    label: "A-Z",
    value: "a-z",
  },
  {
    label: "Z-A",
    value: "z-a",
  },
  {
    label: "Creation date oldest",
    value: "creation_date_oldest",
  },
  {
    label: "Creation date newest",
    value: "creation_date_newest",
  },
  {
    label: "Completion date oldest",
    value: "completion_date_oldest",
  },
  {
    label: "Completion date newest",
    value: "completion_date_newest",
  },
];

const dateOptions = [
  {
    label: "Create later than",
    value: "create_lte",
  },
  {
    label: "Create earlier than",
    value: "create_gte",
  },
  {
    label: "Complete later than",
    value: "complete_lte",
  },
  {
    label: "Complete earlier",
    value: "complete_gte",
  },
];

function Search(props) {
  const [status, setStatus] = useState({ label: "", value: "" });
  const [sort, setSort] = useState({ label: "", value: "" });
  const [dates, setDates] = useState({
    create_lte: null,
    create_gte: null,
    complete_lte: null,
    complete_gte: null,
  });
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    const data = {};
    const { create_lte, create_gte, complete_lte, complete_gte } = dates;

    if (create_lte) data.create_lte = create_lte.toLocaleDateString();

    if (create_gte) data.create_gte = create_gte.toLocaleDateString();

    if (complete_lte) data.complete_lte = complete_lte.toLocaleDateString();

    if (complete_gte) data.complete_gte = complete_gte.toLocaleDateString();

    if (search) data.search = search;

    if (sort.value) data.sort = sort.value;

    if (status) data.status = status.value;

    props.getTasks(data);
  };
  return (
    <div className={styles.search}>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <span className={styles.sortFilter}>Sort and Filter:</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavDropdown title={status.value ? status.label : "Status"}>
              {statusOptions.map((item, index) => {
                return (
                  <NavDropdown.Item
                    key={index}
                    className={styles.options}
                    onClick={() => setStatus(item)}
                    active={status.value === item.value}>
                    {item.label}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title={sort.value ? sort.label : "Sort"}>
              {sortOptions.map((item, index) => {
                return (
                  <NavDropdown.Item
                    className={styles.options}
                    key={index}
                    onClick={() => setSort(item)}
                    active={sort.value === item.value}>
                    {item.label}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>

          {dateOptions.map((item, index) => {
            return (
              <div key={index} className={styles.nav}>
                <span className={styles.label}>{item.label}</span>
                <span>
                  <DatePicker
                    selected={dates[item.value]}
                    onChange={(date) => {
                      setDates({
                        ...dates,
                        [item.value]: date,
                      });
                    }}
                  />
                </span>
              </div>
            );
          })}
        </Navbar.Collapse>
      </Navbar>
      <div className={styles.sortNav}>
        <Form inline className={styles.searchBtn}>
          <FormControl
            className={styles.formControl}
            type="text"
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button
            className={styles.formButton}
            variant="custom"
            onClick={handleSubmit}>
            Search
          </Button>
        </Form>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  getTasks,
};

export default connect(null, mapDispatchToProps)(Search);
