import { useEffect, useRef, useState } from "react";
import { users } from "jira-dev-tool/dist/server/initial-data";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value == null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    //@ts-ignore
    const value = result[key];
    if (isVoid(value)) {
      //@ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    //  TODO useCallback useMemo
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
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

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);

  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

// 第二种方法用来处理页面title
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {

  // 页面加载时候：preTitle === 'React App'
  // 页面加载后：preTitle === title

  // ref在整个生命周期都是保持不变的。这就相当于一个容器，从始至终保持不变。
  const preTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = preTitle;
      }
    }
  }, [keepOnUnmount, preTitle])
}
