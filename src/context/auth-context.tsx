import React, { ReactNode, useState } from "react";
import * as auth from "auth-providers";
import { User } from "../screens/projectList/search-panel";
import { http } from "../util/http";
import { useMount } from "../util";

interface AuthForm {
  username: string;
  password: string;
}

// 在登录状态刷新后仍然登录，
// 这是一个异步请求需要时间，因此这个页面会从未登录变为登录
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    // 这里使用http 是为了自己指定token
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

//用于 jira-tool
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  //页面加载的时候，调用这个方法，保证处于登录状态，如果有token的话
  useMount(() => {
    bootstrapUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在AuthProvider中使用");
  }
  return context;
};
