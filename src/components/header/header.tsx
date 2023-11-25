import styles from "./header.module.css";

export function Header({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}): JSX.Element {
  return <div className={styles.header}>{children}</div>;
}
