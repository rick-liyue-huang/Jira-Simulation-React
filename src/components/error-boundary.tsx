// 处理错误边界
// 如果一个class组件定义了 static getDerivedStateFromError() 或者 componentDidCatch()
// 这两个生命周期的任意一个，那么它就变为错误边界
// 参考 https://github.com/bvaughn/react-error-boundary

import React, {
  Component,
  ReactElement,
  ReactNode,
  PropsWithChildren,
} from "react";

// props:  children fallbackRender
type FallbackRender = (props: { error: Error | null }) => ReactElement;

// export class ErrorBoundary extends Component<
//   {children: ReactNode, fallbackRender: FallbackRender}, any>{
// }

export class ErrorBoundary extends Component<
  PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  //当这个类的子组件产生渲染错误后，这个方法就会调用，返回的值就会赋值给state
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    // 如果有异常就抛出异常
    if (error) {
      return fallbackRender({ error });
    }
    //否则就直接渲染子组件
    return children;
  }
}
