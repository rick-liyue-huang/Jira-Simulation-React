import qs from "qs";
import * as auth from "../auth-providers";
import { useAuth } from "../context/auth-context";

const apiURL = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

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

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      // 未登录的情况或者token失效的情况
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "please re-register" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        // 这里必须要手动抛出异常，因为fetch 不帮助这么做，axios可以帮助自动抛出异常
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();

  // 这里就是将token加入进去
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
