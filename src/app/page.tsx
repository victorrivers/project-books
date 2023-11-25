import { Header } from "lib/components/header/header";
import Books from "../components/books/books";
import { roboto } from "./fonts";
import styles from "./page.module.css";
import classnames from "./utils";

export default function Home() {
  return (
    <>
      <Header>
        <h1 className={classnames(roboto.className, styles.h1)}>Book store</h1>
      </Header>
      <main className={styles.content}>
        <Books />
      </main>
    </>
  );
}
