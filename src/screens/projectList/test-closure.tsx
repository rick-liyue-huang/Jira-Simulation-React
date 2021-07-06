
import React, { useEffect, useState } from "react";
import { useMount } from "../../util";

const testClosure = () => {
  let num = 0;
  const effect = () => {
    num += 1;
    const message = `current number: ${num}`;
    return function unmount()  {
      console.log(message);
    }
  }
  return effect;
}

// 执行test 返回effect函数
const add = testClosure();
// 执行effect函数，返回引用了message1的unmount函数, 注意是不同的message
const unmount = add();
//再次执行effect函数，返回引用了message2的unmount函数
add();
//再次执行effect函数，返回引用了message3的unmount函数
add();
// 执行打印了message1的unmount
unmount();

// react hook 与 闭包 的 冲突
/**
 *
 * useMount, useEffect里面的代码都是页面加载的时候被执行一次，所以里面形成了闭包，
 * 所以里面的作用域引用的都是页面加载的时候的num值，后续无论页面怎么渲染，这两个方法里面都不会再执行。
 * 所以里面的的闭包都是页面初始时候的加载值，
 * 因此需要dependency: [num]
 */
export const Test = () => {
  const [num, setNum] = useState(0);

  const add = () => setNum(num + 1);

  // useMount(() => {
  //   setInterval(() => {
  //     console.log('num in setInterval', num);
  //   }, 1000);
  // })

  // useEffect(() => {
  //   const it = setInterval(() => {
  //     console.log('num in setInterval', num);
  //   }, 1000);
  //   return () => clearInterval(it);
  // }, [num]);

  useEffect(() => {
    return () => {
      console.log(`卸载值： `, num);
    }
  }, [num])

  return <div>
    <button onClick={add}>add</button>
    <p>
      number: {num}
    </p>
  </div>
}