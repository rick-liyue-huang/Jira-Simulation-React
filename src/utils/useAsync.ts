import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initialState,
  });

  // 表示数据请求成功了
  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });

  // 用来出发异步请求
  const run = (promise: Promise<D>) => {
    // 如果传递的不是promise,直接打断
    if (!promise || !promise.then) {
      throw new Error("请传入promise type data");
    }
    //  表示请求开始了
    setState({ ...state, stat: "loading" });
    // 请求开始了
    return (
      promise
        .then((data) => {
          setData(data);
          return data;
        })

        //   如果发生了异常
        .catch((error) => {
          setError(error);
          return error;
        })
    );
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};