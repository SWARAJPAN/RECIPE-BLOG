import React from "react";
// import { useDebounce } from 'use-debounce'
import { useEffect, useState } from "react";

export default function DebounceHooks(value: any, timeout: any, callback: any) {
  const [timer, setTimer] = useState<any>(null);

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
    useEffect(() => {
      clearTimer();

      if (value && callback) {
        const newTimer = setTimeout(callback, timeout);
        setTimer(newTimer);
      }
    }, [value, timeout]);
  };
}

function useDebounce(value: any, timeout: any): [any] {
  throw new Error("Function not implemented.");
}
