import { EXDEV } from "constants";
import * as qs from "qs";
import * as Auth from "../auth-providers";
import { useAuth } from "../context/auth-context";

const apiURL = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

// endpoints 就是参数
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiURL}/${endpoint}`, config).then(async (res) => {
    // 处理未登录或者TOKEN失效的情况
    if (res.status === 401) {
      await Auth.logout();
      window.location.reload();
      return Promise.reject({ message: "重新登录" });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      // 手动抛出异常，为了让catch捕获，对比 axios可以直接返回状态不是2xx的时候自动抛出异常。
      return Promise.reject(data);
    }
  });
};

// 以 http 方法为基础，创建自动携带jwt token的方法

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
