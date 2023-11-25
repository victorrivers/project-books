"use client";

import Link from "next/link";
import Image from "next/image";
import { Book } from "lib/data/types";
import styles from "./book-list.module.css";

export default function BookList(props: { data: Book[] }) {
  const data = props.data;

  return (
    <ul className={styles.ul}>
      {data.map((book) => (
        <li key={book.id} className={styles.li}>
          <Link href={`/book-details/${book.id}`} className={styles.link}>
            <Image
              src={book.coverImage}
              width="100"
              height="100"
              alt={`Book cover image of ${book.title}`}
              blurDataURL="/placeholder.png"
              placeholder="blur"
            />
            <div>
              <div className={styles.title}>{book.title}</div>
              <div className={styles.author}>{`Author: ${book.author}`}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
