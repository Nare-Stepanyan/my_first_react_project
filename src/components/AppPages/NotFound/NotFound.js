import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";
import error from "./../../../assets/images/error.png";
import React, { useState, useEffect } from "react";
import Spinner from "./../../Spinner/Spinner";
export default function NotFound() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.errorText}>
            <img src={error} alt="not found" />
            <p className={styles.link}>
              <Link to="/">go home</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
