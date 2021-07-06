import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "./index";

/**
 * 返回页面url中，指定键的参数值
 * 例如：我们在url中输入
 * http://localhost:3000/projects?name=%E9%AA%91%E6%89%8B&personId=16,
 * 页面就返回对应的对象信息.
 */
/*export const useUrlQueryParam = (keys: string[]) => {
  // 该api是原生的api,参看mdn URLSearchParams, 读取值需要 .get(key)
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("name")); //
  return [
    // 这里是造成无限渲染的原因，因为每次都重新创建
    // 当是基本类型就不会无限循环。
    keys.reduce((prev, key) => {
      return {...prev, [key]: searchParams.get(key) || ''}
    }, {} as {[key in string]: string}),
    setSearchParams
  ] as const
}*/

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // 该api是原生的api,参看mdn URLSearchParams, 读取值需要 .get(key)
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("name")); //
  return [
    useMemo(
      () => keys.reduce((prev, key) => {
        return {...prev, [key]: searchParams.get(key) || ''}
      }, {} as {[key in K]: string}),
      // eslint-disable-next-line  react-hooks/exhaustive-deps
      [searchParams/*, keys*/]), // 这样只有在 searchParams改变的时候才进行运算
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit;
      return setSearchParams(o);
    }
  ] as const
}

// 这么写，就会认为这是一个 元素为 string, number 或者 object 的数组
// const a = ['jack', 12, {gender: 'male'}];

// 这就强制变为强制类型
// const aa = ['jack', 12, {gender: 'male'}] as const;
// const ab =['2'] as const;


// 基本类型 和 组件状态 可以放到 依赖里面，非组件状态绝对不可以放入到依赖里面

// iterator
/**
 * 数组 对象 都具有 iterator的属性
 * iterator 可以通过 for（ of） 遍历
 */