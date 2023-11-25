"use client";

import { Book } from "lib/data/types";
import Image from "next/image";
import { inter, roboto } from "lib/app/fonts";
import classnames from "lib/app/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spinner } from "../spinner/spinner";
import styles from "./book-details.module.css";
import { Header } from "../header/header";

export default function BooksDetails({ id }: { id: string }) {
  const [data, setData] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/book-details?id=${id}`)
      .then((response) => response.json())
      .then((value) => {
        setData(value);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return <Details data={data} isLoading={isLoading} />;
}

function Details(props: {
  data: Book | null;
  isLoading: boolean;
}): JSX.Element {
  const data = getBookDetailsOrFallback(props);

  const { isLoading } = props;

  return (
    <>
      <Header>
        <h1 className={classnames(roboto.className, styles.header)}>
          <small className={classnames(styles.small, inter.className)}>
            Book title
          </small>
          {!isLoading && <div>{data.title}</div>}
        </h1>
      </Header>
      {isLoading ? (
        <div className={styles.loading}>
          <Spinner />
        </div>
      ) : (
        <main className={styles.container}>
          <div className={styles.details}>
            <label className={classnames(styles.label, roboto.className)}>
              Details
            </label>
            <hr />
            <div className={styles.detailsItems}>
              <div
                className={styles.detailsItem}
              >{`Author: ${data.author}`}</div>
              <div
                className={styles.detailsItem}
              >{`Publication date: ${data.publicationDate}`}</div>
              <div
                className={styles.detailsItem}
              >{`Description: ${data.description}`}</div>
            </div>
            <Link href="/" className={styles.linkBack}>
              ← Back to books
            </Link>
          </div>
          <Image
            src={data.coverImage}
            width="640"
            height="480"
            alt={`Book cover image of ${data.title}`}
            blurDataURL="/placeholder.png"
            placeholder="blur"
          />
        </main>
      )}
    </>
  );
}

function getBookDetailsOrFallback(props: { data: Book | null }) {
  let data: Book = {
    title: "Book details not available",
    author: "Not available",
    publicationDate: "Not available",
    description: "Not available",
    coverImage: "/placeholder.png",
    id: "Not available",
  };

  if (props.data !== null) {
    data = props.data;
  }

  return data;
}
