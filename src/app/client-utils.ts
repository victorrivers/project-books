"use client";

import { useEffect, useRef } from "react";

export function useDebounceFn(callback: (...args: any[]) => void, time = 500) {
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(
    () => () => timeout.current && clearTimeout(timeout.current),
    [timeout]
  );

  return (...args: any[]) => {
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      callback(...args);
    }, time);
  };
}
