/*
定义一些函数，操作jwt的token
在真实环境中，如果使用firebase这种第三方服务，就不需要额外开发
*/

import { User } from "./screens/projectList/search-panel";

const localStorageKey = "__auth_provider_token__";
const apiURL = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  fetch(`${apiURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  fetch(`${apiURL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/register",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    }
  });
};

export const logout = () => window.localStorage.removeItem(localStorageKey);
