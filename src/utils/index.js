import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState();
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完后再运行
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

/*
const debounce = (func, delay) => {
  let timer = null;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      func();
    }, delay);
  }
}

const log = debounce(() => console.log('call'), 5000);
log();
log();
log();*/
