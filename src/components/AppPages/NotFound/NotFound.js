import React from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";
import error from "./../../../assets/images/error.png";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.errorText}>
        <img src={error} alt="not found" />
        <p className={styles.link}>
          <Link to="/">go home</Link>
        </p>
      </div>
    </div>
  );
}
