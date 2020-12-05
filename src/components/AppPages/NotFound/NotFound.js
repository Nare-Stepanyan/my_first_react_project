import React from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.errorText}>
          <h2>404</h2>
          <h3>SORRY</h3>
          <p>The Page You're Looking for Was Not Found.</p>
          <Link to="/">go home</Link>
        </div>
      </div>
    </div>
  );
}
