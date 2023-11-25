"use client";

import styles from "./spinner.module.css";

export function Spinner(): JSX.Element {
  return (
    <div
      data-component="spinner"
      className={styles.spinner}
      role="img"
      aria-label="Loading"
    />
  );
}
