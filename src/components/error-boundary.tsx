
import React, { Component, ReactNode } from "react";

// 用来展示全局错误！！！！！！！并且在App.tsx中应用,
// 更多错误边界参照 react-error-boundary library
// 错误边界必须使用class 组件
// P: {children: ReactNode, fallbackRender: FallbackRender}
// S: {error: Error | null}
type FallbackRender = (props: {error: Error | null}) => React.ReactElement
export class ErrorBoundary extends Component<React.PropsWithChildren<{fallbackRender: FallbackRender}>, {error: Error | null}> {
  state = {error: null};

  // 当子组件抛出异常，这里会接收到并且调用，将得到的error赋值给state
  static getDerivedStateFromError(error: Error) {
    return {error}
  }

  render() {
    const {error} = this.state;
    const {fallbackRender, children} = this.props;
    if (error) {
      return fallbackRender({error});
    }
    return children;
  }
}