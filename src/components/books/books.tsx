"use client";

import BookList from "../book-list/book-list";
import { useEffect, useState } from "react";
import { Book } from "lib/data/types";
import { Spinner } from "../spinner/spinner";
import styles from "./books.module.css";
import { useDebounceFn } from "lib/app/client-utils";

export default function Books() {
  const [data, setData] = useState<Book[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setData(null);
  }, [inputValue]);

  useEffect(() => {
    fetch(`/api/books?take=20&skip=0&query=${searchQuery}`)
      .then((response) => response.json())
      .then((value) => {
        setData(value);
      });
  }, [searchQuery]);

  const debounceKeyTyping = useDebounceFn(
    (value: string) => setSearchQuery(value),
    1000
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    debounceKeyTyping(e.target.value);
  }

  return (
    <>
      <input
        type="search"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
        className={styles.search}
      />

      {data ? (
        data.length > 0 ? (
          <BookList data={data} />
        ) : (
          <p>No search results found.</p>
        )
      ) : (
        <div className={styles.loading}>
          <Spinner />
        </div>
      )}
    </>
  );
}
