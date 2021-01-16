import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaCodeBranch } from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  let year = new Date().getFullYear();

  return (
    <div className={styles.footer}>
      <div className={styles.social}>
        <p className={styles.connect}>
          <Link
            to={{ pathname: "https://github.com/Nare-Stepanyan" }}
            target="_blank">
            <FaCodeBranch className={styles.iconGit} />
            <span className={styles.text}>Check out my Github</span>
          </Link>
        </p>
        <p className={styles.connect}>
          <Link
            to={{
              pathname: "https://www.linkedin.com/in/nare-stepanyan-4aa3171b5/",
            }}
            target="_blank">
            <FaLinkedinIn className={styles.iconLinkdin} />
            <span className={styles.text}>Send me a message on Linkdin</span>
          </Link>
        </p>
      </div>
      <div className={styles.rights}>
        <span> © {year} All rights reserved</span>
      </div>
    </div>
  );
}
