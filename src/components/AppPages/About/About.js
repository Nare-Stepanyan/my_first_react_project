import React from "react";
import styles from "./About.module.css";
import { Link } from "react-router-dom";
import about from "./../../../assets/images/about.png";

export default function About() {
  return (
    <div className={styles.about}>
      <p className={styles.first}>
        <span>T.M.</span> is my first <span>React Project</span>. It is a task
        management tool, with the abilities of searching, sorting and filtering
        options. One may manage unlimited tasks, set deadlines, edit at any
        time, remove some or all of them. It is simple and convenient to use.
      </p>
      <p className={styles.second}>
        If there is something you would like me to improve, add or change in
        this project, do not hasitate to send me a message through
        <Link to="/contact">
          <span className={styles.text}> contact form </span>
        </Link>
        or find me on
        <Link
          to={{
            pathname: "https://www.linkedin.com/in/nare-stepanyan-4aa3171b5/",
          }}
          target="_blank">
          <span className={styles.text}> Linkedin</span>
        </Link>
        . Any opinion will be beneficial. I appreciate your time.
      </p>
      <p className={styles.third}>
        If you want to look through the source code just check out my
        <Link
          to={{
            pathname:
              "https://github.com/Nare-Stepanyan/my_first_react_project",
          }}
          target="_blank">
          <span className={styles.text}> Github</span>.
        </Link>
      </p>
      <div className={styles.img}>
        <img src={about} alt="future developer" />
      </div>
    </div>
  );
}
